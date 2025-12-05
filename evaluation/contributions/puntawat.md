# Project Contribution Report

Contributor: Puntawat Subhamani

## 1. Role in Group Project

I was responsible for the lifecycle of the "Post Job" feature, from initial implementation to adding security layers. Additionally, I handled critical bug fixes for other team members' code and managed the testing suites for both Version 1 and Version 2 releases.

**Key Responsibilities:**

- **Feature Development:** Developed the `POST` endpoints for creating job listings.
    
- **Security Integration:** Implemented authentication middleware for job creation endpoints.
    
- **Debugging:** identified and fixed parameter naming errors in the `jobController` that were breaking the delete functionality.
    
- **Testing:** Created and executed test scripts for `v1` and `v2` to ensure API reliability.
    

## 2. Branches and Features

I managed the following branches during the development cycle:

### **Feature Implementation**

- `feature-postjob`
    
    - **Scope:** Created the initial logic to allow users to post new jobs to the database.
        
- `v2-post-jobs-auth`
    
    - **Scope:** Updated the posting logic to require a valid user token (Authentication).
        

### **Bug Fixes & Maintenance**

- `feature-deleteonebyid`
    
    - **Scope:** Debugging. I did not create the original feature, but I pushed a fix to correct a `req.params` naming mismatch in the controller.
        

### **Testing**

- `v1-test`
    
    - **Scope:** Implemented testing logic for the Version 1 release.
        
- `v2-testing`
    
    - **Scope:** Implemented testing logic for the Version 2 release.
        

## 3. Authored Commits

The following is a complete list of commits I authored across all branches, ordered by time (newest to oldest):

|**Commit Hash**|**Time**|**Branch Context**|**Message**|
|---|---|---|---|
|`77cb109`|22:43|`v1-test`|**v1 test**<br><br>  <br><br>_(Added test suite for V1)_|
|`898fb90`|22:40|`feature-deleteonebyid`|**fix bugs in jobController: change params name**<br><br>  <br><br>_(Fixed parameter mismatch preventing deletion)_|
|`db8f0d2`|22:18|`v2-testing`|**test v2**<br><br>  <br><br>_(Added test suite for V2)_|
|`a139089`|16:30|`v2-post-jobs-auth`|**add auth to post endpoint**<br><br>  <br><br>_(Secured the create job endpoint)_|
|`60dde5d`|12:00|`feature-postjob`|**implement post a job**<br><br>  <br><br>_(Initial creation of job posting feature)_|

## 4. Pull Requests

No pull requests were created by me.
