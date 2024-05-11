import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    handle!: string;

    @Column()
    title!: string;

    @Column({ type: 'text'})
    description!: string;

    @Column()
    sku!: string;

    @Column({ type: 'double'})
    grams!: number;

    @Column()
    stock!: number;

    @Column({ type: 'double' })
    price!: number;

    @Column({ name: 'compare_price', type: 'double' })
    comparePrice!: number;

    @Column({nullable: true})
    barcode!: string;

}