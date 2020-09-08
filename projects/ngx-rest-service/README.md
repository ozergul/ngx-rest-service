## ngx-rest-service

<a href="https://npm-stat.com/charts.html?package=ngx-rest-service&from=2020-09-08">
    <img src="https://img.shields.io/apm/dm/ngx-rest-service" />
</a>

<br><br>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.


## Install

    npm install ngx-rest-service
    
or

    yarn add ngx-rest-service 
    
### Usage
Add to imports:

    @NgModule({  
      imports: [  
        NgxRestModule.forRoot({  
          apiBaseUrl: 'http://localhost:3001', // <---- base url, you can get from environment.
        }),  
      ],  
    })

Extend RestService in your service:

    import { Injectable } from '@angular/core';  
    import { Observable } from 'rxjs';  
    import { Auth, User } from '../../models';  
    import { Body, Get, Post, RestService } from 'ngx-rest-service';  
      
    @Injectable({  
      providedIn: 'root',  
    })  
    export class AuthService extends RestService {  
      @Post('/auth/login')  
      login(@Body userLoginRequest: Auth.UserLoginRequest): Observable<Auth.LoginResponse> {  
        return null;  
      }  
      
      @Post('/auth/register')  
      register(@Body userRegisterRequest: Auth.UserRegisterRequest): Observable<User> {  
        return null;  
      }  
      
      @Get('/auth/me')  
      inquireMe(): Observable<User> {  
        return null;  
      }  
    }

#### @Get()
You can use @Get() decorator to make GET request:

    @Get('/projects')  
    getProjects(): Observable<Project> {  
      return null;  
    }
Equals:

    <apiBaseUrl>/projects

---

    @Get('/projects/{code}')  
    getProjectByCode(@Path('code') code: string): Observable<Project> {  
      return null;  
    }
Equals:

    <apiBaseUrl>/projects/{code}
---
  

    @Get('/projects')  
    getProjects(@Query('page') page?: number, @Query('limit') limit?: number): Observable<Pagination<Project>> {  
      return null;  
    }
Equals:

    <apiBaseUrl>/projects?page={page}&limit={limit}
---

    @Get('/projects/${id}')   
    inquireAcquisitionCredit(
      @Path('id') id: number,  
      @Params('personCount') personCount: number,  
    ): Observable<Project[]> {  
      return null;  
    }
Equals:

    <apiBaseUrl>//projects/{id}

Query String Parameters

    personCount: ${personCount}

#### @Post()

    @Post('/projects/create')  
    createProject(@Body project: Project): Observable<Project> {  
      return null;  
    }
    
Equals

    
#### @Put()

    @Put('/projects/update')  
    updateProject(@Body project: Project): Observable<Project> {  
      return null;  
    }
### @Delete()

    @Delete('/projects/{id}')  
    deleteProject(@Path('id') id: number): Observable<DeleteResult> {  
      return null;  
    }
### Download  blob example

    @Get('/downloadExcel')    
    @Headers({  
      Accept: 'application/octet-stream,application/json',  
    })  
    @ResponseType(eHTTP.ResponseType.Blob)  
    inquireBillingAccountChargesSummaryExcel(  
      @Body body: DownloadProjectsExcelRequest,  
    ): Observable<Blob> {  
      return null;  
    }





## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
