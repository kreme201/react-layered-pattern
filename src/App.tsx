import React from "react";
import { container } from "tsyringe";
import { proxy, useSnapshot } from "valtio";
import { HelloCreateDto } from "./domains/Hello/HelloDtos";
import HelloEntity from "./domains/Hello/HelloEntity";

import HelloService from "./domains/Hello/HelloService";

const state = proxy({
    data: new Array<HelloEntity>(),
});
const input = proxy<HelloCreateDto>({
    name: "",
} as HelloCreateDto);

export default function App() {
    const hello = container.resolve<HelloService>(HelloService);
    const data = useSnapshot<Array<HelloEntity>>(state.data);
    const inputData = useSnapshot<HelloCreateDto>(input);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        input.name = e.target.value;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): boolean => {
        e.preventDefault();

        hello.createData({
            name: inputData.name,
        } as HelloCreateDto);

        state.data = hello.getList();

        input.name = "";

        return false;
    };

    return (
        <div>
            <h1>Sample App</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputData.name}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button type="submit">Append</button>
            </form>

            <ul>
                {data.map((value: HelloEntity, index: number) => (
                    <li key={index}>
                        <p>{value.name}</p>
                        <span>{value.modifiedFormat()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
