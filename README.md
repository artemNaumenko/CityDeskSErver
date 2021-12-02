# CityDeskServer

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   
    EVERY request MUST contains in headers API access key


#methods:
#get "/" 
    test requset, if good conditions server return status 200 
    and message "Server is available".
    
#post "/addProblem"
    request for add new city problem into database, request body contains title, context, 
    authorId (not google id, but id from our database), longitude, latitude parameters 
    photoURL and list responsibleOrganizations (The register has marking!!!). 
    If good condition server return status 200. Server return status 401
    if user is not find, 402 is user is banned, 403 if data in body requse is
    incorrect.

#get "/getAllUnsolvedProblems"
    request for list that contains all UNSOLVED problems in database. 
    If good conditions server return status 200
    and json list. 

#get "/getAllSolvedProblems"
    request for list that contains all SOLVED problems in database. 
    If good conditions server return status 200
    and json list.

#get "/getProblems/solvedFilter=:SOLVED/organizationFilter=:ORGANIZATION"
    request for list filtered problems. Parameter :SOLVED may be
    true || false || none, paramrter :ORGANIZATION may be 
    organizationId || none. If good conditions server return status 200
    and json list.

#get "/getProblem/:problemId"
    requst for getting problem from database bt specific id. If good 
    conditions server return status 200 and problem object. If problemId is 
    invaild server return status 401.

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

#get "/getUser/:userId"
    request for getting user by specific id. An id sent as param 
    (for exmaple if userId is 123 then we will use next one request: "/getUser/123").
    If good conditions server return status 200 and user object. If userId is invaild 
    server return status 401.

#get "/getOrganizations"
    request for getting list that contains all organizations from database.
    if good conditions server return status 200 and json list.

#get "/getOrganization/:organizationId"
    requst for getting organization from database bt specific id. If good 
    conditions server return status 200 and organization object. If organizationId is 
    invaild server return status 401.