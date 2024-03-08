import { IsDate, IsEmail, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    @Length(11, 11)
    cpf: string;

    @Column({ type: 'varchar' })
    @Length(1, 100)
    name: string;

    @Column({ type: 'date' })
    @IsDate()
    birthdate: Date;

    @Column({ type: 'tinyint' })
    status: boolean;

    @Column({ type: 'tinyint' })
    gender: boolean;

    @Column({ type: 'varchar' })
    @IsEmail()
    email: string;
}