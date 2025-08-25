import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function IsPhoneByCountry(property: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isPhoneByCountry',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const country = (args.object as any)[relatedPropertyName];

                    if (!value || !country) return false;

                    try {
                        const phoneNumber = parsePhoneNumberFromString(value, country);
                        return phoneNumber?.isValid() ?? false;
                    } catch {
                        return false;
                    }
                },
                defaultMessage(args: ValidationArguments) {
                    return `Phone number is not valid for country ${(args.object as any)[args.constraints[0]]}`;
                },
            },
            async: false,
        });
    };
}
