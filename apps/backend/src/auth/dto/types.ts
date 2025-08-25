export interface JWTSignDto {
    id: string;
    email: string;
}

export interface JWTVerifyResponseDto extends JWTSignDto {
    iat: number;
    exp: number;
}
