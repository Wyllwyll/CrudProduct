import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
export class Product extends BaseEntity {


    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number


    @ApiProperty()
    @Column({ type: 'varchar' })
    name: string;


    @ApiProperty()
    @Column({ type: 'money' })
    price: number


    @ApiProperty()
    @Column()
    quantity: number
}