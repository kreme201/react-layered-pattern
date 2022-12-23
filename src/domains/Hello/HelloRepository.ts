import { singleton } from "tsyringe";
import { HelloCreateDto } from "./HelloDtos";
import HelloEntity from "./HelloEntity";

@singleton()
export default class HelloRepository {
    private data: Array<HelloEntity> = [];

    public get(): Array<HelloEntity> {
        return this.data;
    }

    public create(data: HelloCreateDto) {
        this.data = this.data.concat(new HelloEntity(data.name));
    }
}
