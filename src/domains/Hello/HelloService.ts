import { inject, singleton } from "tsyringe";
import { HelloCreateDto } from "./HelloDtos";
import HelloEntity from "./HelloEntity";
import HelloRepository from "./HelloRepository";

@singleton()
export default class HelloService {
    constructor(
        @inject(HelloRepository) private helloRepository: HelloRepository
    ) {
        console.log("HelloService Init");
    }

    public getList(): Array<HelloEntity> {
        return this.helloRepository.get();
    }

    public createData(data: HelloCreateDto): void {
        this.helloRepository.create(data);
    }
}
