class APIFeatures{
    constructor(queryObj,queryBuild){
        let createFilterQuery = function(obj){
            let temp = {...obj};
            let excludeFields = ["sort","page","limit","fields"];
            excludeFields.forEach(el => delete temp[el]);
            return JSON.stringify(temp)
                   .replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`); // queryString for filter
        }
        this.queryObj = queryObj; // query object from request
        this.filterQuery = createFilterQuery(this.queryObj);
        this.queryBuild = queryBuild;  // to chain query together
    }
    //Advanced Filtering  (gte|lte|gt|lt)
    filter(){
        this.queryBuild = this.queryBuild.find(JSON.parse(this.filterQuery));
        return this;
    }
    //Sorting (sort the documents)
    sort(){
        if(this.queryObj.sort){
            let sortFields = this.queryObj.sort.split(",").join(" ");
            this.queryBuild = this.queryBuild.sort(sortFields);
        } else{
            this.queryBuild = this.queryBuild.sort("-createdAt _id");
        }
        return this;
    }
    // Limiting fields (fields to be  sent) 
    limitFields(){
        if(this.queryObj.fields){
            const fields = this.queryObj.fields.split(",").join(" ");
            this.queryBuild = this.queryBuild.select(fields);
        } else{
            this.queryBuild = this.queryBuild.select("-__v");
        }
        return this;
    }
    // pagination
    // page 1 : 1-10 page 2: 11 - 20
    paginate(){
        const page = this.queryObj.page * 1 || 1;  
        const limit = this.queryObj.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.queryBuild = this.queryBuild.skip(skip).limit(limit);
       return this;
    }
}



module.exports = APIFeatures;