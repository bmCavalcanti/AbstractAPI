import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsDate, IsEmail, Length } from "class-validator";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 100)
    name: string;

    @Column()
    @Length(11, 11)
    cpf: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    status: boolean;
}