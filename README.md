# CityDeskServer

#methods:
#get "/" 
    test requset, if good conditions server return status 200 
    and message "Server is available".
    
#post "/addProblem"
    request for add new city problem into database, request body contains title, context, 
    userId (not google id, but id from our database), longitude, latitude parameters 
    photoURL (The register has marking!!!). If good condition server return status 200.

#get "/getAllUnsolvedProblems"
    request for list that contains all UNSOLVED problems in database. 
    If good conditions server return status 200 .
    and json object. 

#get "/getAllSolvedProblems"
    request for list that contains all SOLVED problems in database. 
    If good conditions server return status 200.
    and json object.

#delete "/deleteProblem"
    request for deleting problem (actualy object does not delete from database)
    only problem status will be changed on SOLVED. If good conditions 
    server return status 200. 

#post "/signIn"
    request for login/registration of user, body request contains id (google id), name, 
    photoURL, email (The register has marking!!!). If good conditions server 
    return status 200 and userId from our database.
    
#delete "/deleteUser"
    request for deleting problem (actualy object does not delete from database)
    only user status will be changed on BANNED. If good conditions 
    server return status 200.

#databaseCollections
#userStatus
    _id
    value: {"ACTIVE" || "BANNED"}

#user
    _id
    googleId
    name
    email
    photoURL
    statusID: references on _id of object from collection userStatus

#problemStatus
    _id
    value: {"UNSOLVED" || "SOLVED"}

#problem
    _id
    title 
    context
    authorID: references on _id of object from collection user
    photoURL
    longitude
    latitude
    statusID: references on _id of object from collection problemStatus
    createdAt: timestamp
    updatedAt: timestamps