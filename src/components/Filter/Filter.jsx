import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import "./Filter.css";

export const Filter = ({states, setStatus, tasks, filterForm, setFilterForm, filteredTasks, setFilteredTasks}) => {

    const { register, handleSubmit, getValues, setValue} = useForm();

    const searchTask = () => {
        const filterStatus = getValues();
        setFilterForm(filterStatus);
        let filteredTasks = [];

        tasks.forEach(task => {
            const keywordMatch = task.description.includes(filterStatus.keyword);
            const statusMatch = filterStatus.status === task.status;

            // 検索キーワードを含みステータスが一致する場合
            if (keywordMatch && statusMatch) {
                filteredTasks.push(task);
            } else if (statusMatch) {
                filteredTasks.push(task);
            }
        });

        setFilteredTasks(filteredTasks);

    }

    useEffect(() => {
        setFilterForm(getValues());
    }, []);

    return(
        <form onSubmit={handleSubmit(searchTask)} className="filter">
            <FormLabel>ステータス</FormLabel>
            <RadioGroup
                defaultValue={"notStart"}
                row
            >
                <FormControlLabel value={"notStart"} {...register("status")} control={<Radio/>} label={"未着手"}/>
                <FormControlLabel value={"working"} {...register("status")} control={<Radio/>} label={"作業中"}/>
                <FormControlLabel value={"complete"} {...register("status")} control={<Radio/>} label={"完了"}/>
            </RadioGroup>
            <TextField 
                type="text" label="キーワード" className="keywordText"
                defaultValue={""}
                {...register("keyword")}
            />
            <Button
                type="submit"
                variant="contained"
                color="inherit"
                sx={{marginTop: "0.5rem", display: "block"}}
            >検索</Button>
        </form>
    );
}