function entityGenerator(entityName) {
    return `
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ${entityName} extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    example1: string

    @Column()
    example2: number
} 
    `
}

module.exports = entityGenerator;