import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        refreshToken: string;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
        user: User;

    @CreateDateColumn()
        createdAt: Date;

    @Column({ nullable: true })
        expiresAt: Date;
}
