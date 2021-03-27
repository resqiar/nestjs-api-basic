import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    _id: number;

    @Column()
    username: string;
    
    @Column()
    email: string;

    @Column({ nullable: true, default: "18" })
    age: number;

    @Column({ nullable: true, default: false})
    isPaid: boolean;

    @CreateDateColumn()
    createdAt: Date;
}