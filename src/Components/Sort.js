import React from "react";
// import styles from "./SearchByGenre.module.css"
import axios from "axios"
import { thisExpression } from "@babel/types";

class Sort extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            year:"",
            box_office:"",
            input_value:"",
            sort_details:[]
        }
    }

    handleInput=(e)=>{
        this.setState({
            input_value:e.target.value
        })
    }
    
    get_sort_details=()=>{
        axios({
            method:"get",
            url: 'https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/movies_collections.json',
        })
        .then((response) =>{
            let sort = ""
            if(this.state.input_val === "year_asc" ){
                sort = response.data.sort((val_a, val_b) => val_a.year - val_b.year);
            }
            if(this.state.input_val === "year_desc" ){
                sort = response.data.sort((val_a, val_b) => val_b.year - val_a.year);
            }
            if(this.state.input_val === "box_office_asc" ){
                sort = response.data.sort((val_a, val_b) => val_a.box_office - val_b.box_office);
            }
            if(this.state.input_val === "box_office_desc" ){
                sort = response.data.sort((val_a, val_b) => val_a.box_office - val_a.box_office);
            }
            this.setState({
                sort_details : sort
            })
   })
   .catch((err) => alert(err))

    }

    render()
    {
        return(
            <form>
                <div className="form-row align-items-center">
                    <div className="col-auto my-1">
                        <label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
                            <select onChange ={this.handleInput} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                <option selected>Choose...</option>
                                <option value="year_asc">Year Ascending</option>
                                <option value="year_desc">Year Descending</option>
                                <option value="box_office_asc">Box Office</option>
                                <option value="box_office_desc">Box Office</option>
                            </select>
                    </div>
                    <div className="col-auto my-1">
                        <button type="button" className="btn btn-primary" onClick ={this.get_sort_details}>Search</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default Sort;