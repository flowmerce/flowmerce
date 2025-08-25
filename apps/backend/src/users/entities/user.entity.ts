import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Session } from '../../auth/entities/session.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        username: string;

    @Column()
        country: string;

    @Column({ unique: true })
        email: string;

    @Column({ unique: true })
        phone: string;

    @Column()
        password: string;

    @CreateDateColumn()
        createdAt: Date;

    @UpdateDateColumn()
        updatedAt: Date;

    @OneToMany(() => Session, (session) => session.user)
        sessions: Session[];
}
