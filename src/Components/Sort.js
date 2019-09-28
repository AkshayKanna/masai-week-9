import React from "react";
import styles from "./SearchByGenre.module.css"
import axios from "axios"


class Sort extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            year:"",
            box_office:"",
            input_value:"",
            sort_details:[],
            bring:false,
            select : "",
            visible:20

        }
        this.loadMore=this.loadMore.bind(this)
    }

    loadMore(){
        this.setState((prev) =>{
            return{visible:prev.visible +20};
        });
    }


    handleInput=(e)=>{
        this.setState({
            input_value:e.target.value,
            bring:false
        })
    }
    
    onSubmit =()=>{
        axios({
            method:"get",
            url: 'https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/movies_collections.json',
        })
        .then((response) =>{
            let sort = ""
            if(this.state.select === "year_asc" ){
                sort = response.data.sort((val_a, val_b) => val_a.year - val_b.year);
                this.setState({
                    sort_details : sort
                })
                console.log(sort)
            }
            
            if(this.state.select === "year_desc" ){
                sort = response.data.sort((val_a, val_b) => val_b.year - val_a.year);
                this.setState({
                    sort_details : sort
                })
            }
            if(this.state.select === "box_office_asc" ){
                sort = response.data.sort((val_a, val_b) => val_a.box_office - val_b.box_office);
                this.setState({
                    sort_details : sort
                })
            }
            if(this.state.select === "box_office_desc" ){
                sort = response.data.sort((val_a, val_b) => val_b.box_office - val_a.box_office);
                this.setState({
                    sort_details : sort
                })
            }
            
   })
   .catch((err) => alert(err))
        this.setState({
            bring:true
        })
    }


    render()
    {
        return(
            <div>
                <form className={styles.align}>
                    <div className="form-row align-items-center">
                        <div className="col-auto my-1">
                            <label className="mr-sm-2 sr-only " for="inlineFormCustomSelect">Preference</label>
                                <select onClick ={(e) => {
                                    this.setState({
                                        select:e.target.value
                                    })
                                }} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                    <option selected>Choose...</option>
                                    <option value="year_asc">Low to High Year</option>
                                    <option value="year_desc">High to Low Year</option>
                                    <option value="box_office_asc">Low to High box_office</option>
                                    <option value="box_office_desc">High to Low box_office</option>
                                </select>
                        </div>
                        <div className="col-auto my-1">
                            <button type="button" className="btn btn-primary" onClick ={this.onSubmit}>Search</button>
                        </div>
                    </div>
                </form>
                {this.state.bring  ?(
                    <div className="container-fluid">
                        <div className = "row " >
                            { this.state.sort_details.slice(0,this.state.visible).map((sort_details) => {
                                if(sort_details.year===this.state.input_value || (this.state.select==="year_asc") || (this.state.select==="year_desc") || (this.state.select==="box_office_asc") ||(this.state.select==="box_office_desc"))
                                {
                                    return (
                                    <div className = "card col-lg-3 col-md-4 col-sm-3" key = {sort_details.id} style={{background: "linear-gradient(45deg, #874da2 0%, #c43a30 100%)",color:"white"}}>
                                        <div class="card-body" className={styles.font}>
                                            <h3 class="card-title" > <b>TITLE:{sort_details.title}</b></h3><br /> <hr></hr>
                                            <h5 class="card-subtitle "> GENRE: {sort_details.genre}</h5> <hr></hr>
                                            <h5 class="card-subtitle "> YEAR: {sort_details.year}</h5> <hr></hr>
                                            <h5 class="card-subtitle "> BOX_OFFICE: {sort_details.box_office}</h5> <hr></hr>
                                            <br />
                                        </div>
                                    </div>
                                    );
                                }
                                })
                            }
                        </div>
                        <div className="text-center">
                            {this.state.visible < this.state.sort_details.length && 
                                <button onClick={this.loadMore} className="btn btn-primary mt-4 text-center" type="button">Load More</button>
                            }
                        </div>
                       
                     
                        
                    </div>
                    ) : null}
            </div>    
        );
    }
}
export default Sort;