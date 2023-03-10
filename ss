[34m7aeb2ab[31m (HEAD -> master, origin/master) [37misolate common setup for AwsS3FileStorage - [36mSergio-Pedretti, [32m6 weeks ago
[34mc4c7af6[31m [37mmove AwsS3FileStorage to its own file - [36mSergio-Pedretti, [32m6 weeks ago
[34m2bbcadc[31m [37mensure AwsS3FileStorage rethrows when putObject throws - [36mSergio-Pedretti, [32m6 weeks ago
[34m2f4a11c[31m [37mensure AwsS3FileStorage returns encoded imgUrl - [36mSergio-Pedretti, [32m6 weeks ago
[34mc8fa6e3[31m [37mensure AwsS3FileStorage calls putObject with correct input - [36mSergio-Pedretti, [32m6 weeks ago
[34ma434842[31m [37misolate sut creation - [36mSergio-Pedretti, [32m6 weeks ago
[34mec3ee18[31m [37mensure AwsS3FileStorage config AWS credentials on creation - [36mSergio-Pedretti, [32m6 weeks ago
[34m03a4a96[31m [37mmove UniqueId to its own file - [36mSergio-Pedretti, [32m6 weeks ago
[34md1b3983[31m [37mensure UniqueId returns correct uuid - [36mSergio-Pedretti, [32m6 weeks ago
[34m0684bd4[31m [37mmove UUIDHandler to its own file - [36mSergio-Pedretti, [32m6 weeks ago
[34mcac4ee3[31m [37mensure UUIDHandler UUID method return correct uuid - [36mSergio-Pedretti, [32m6 weeks ago
[34m548ecd0[31m [37mensure UUIDHandler calls uuid.v4 - [36mSergio-Pedretti, [32m6 weeks ago
[34m73566e2[31m [37mensure ChangeProfilePicture rethrows when SaveUserPicture throws - [36mSergio-Pedretti, [32m6 weeks ago
[34mf4c9e22[31m [37mensure ChangeProfilePicture do not call DeleteFile if file does not exists and SaveUserPicture throws - [36mSergio-Pedretti, [32m6 weeks ago
[34m72f3736[31m [37mensure ChangeProfilePicture returns correct data on sucess - [36mSergio-Pedretti, [32m6 weeks ago
[34m1bd6144[31m [37mmove business logic to UserProfile entity - [36mSergio-Pedretti, [32m6 weeks ago
[34m97771e6[31m [37mensure ChangeProfilePicture calls SaveUserPicture with correct input if initials is undefined - [36mSergio-Pedretti, [32m7 weeks ago
[34mce4bc62[31m [37mensure ChangeProfilePicture calls SaveUserPicture with correct initials case has only one letter - [36mSergio-Pedretti, [32m7 weeks ago
[34ma4f1412[31m [37mensure ChangeProfilePicture calls SaveUserPicture with correct initials - [36mSergio-Pedretti, [32m7 weeks ago
[34m32d9c1e[31m [37mensure ChangeProfilePicture do not call LoadUserPicture if file exists - [36mSergio-Pedretti, [32m7 weeks ago
[34m998c23b[31m [37mensure ChangeProfilePicture calls LoadUserPicture with correct input - [36mSergio-Pedretti, [32m7 weeks ago
[34md2faef2[31m [37mensure ChangeProfilePicture calls SaveUserPicture with correct initials - [36mSergio-Pedretti, [32m7 weeks ago
[34m471cc12[31m [37mensure ChangeProfilePicture calls SaveUserPicture with correct input when file is undefined - [36mSergio-Pedretti, [32m7 weeks ago
[34mbeeeaa6[31m [37mensure ChangeProfilePicture calls SaveUserPicture with correct inputs - [36mSergio-Pedretti, [32m7 weeks ago
[34mc98ac1a[31m [37mensure UploadFile is not called case input is undefined - [36mSergio-Pedretti, [32m7 weeks ago
[34mde7a18d[31m [37mmove ChangeProfilePicture code to its own files - [36mSergio-Pedretti, [32m7 weeks ago
[34m0e5f235[31m [37misolate sut creation - [36mSergio-Pedretti, [32m7 weeks ago
[34md791640[31m [37mensure ChangeProfilePicture calls UploadFile with correct params - [36mSergio-Pedretti, [32m7 weeks ago
[34m9faa36b[31m [37madd breakpoints and @ config with ts-node - [36mSergio-Pedretti, [32m8 weeks ago
[34m576dea4[31m [37mchore: add ts-node-dev - [36mSergio-Pedretti, [32m8 weeks ago
[34mbe3d2f1[31m [37mremove anti pattern middle man - [36mSergio-Pedretti, [32m8 weeks ago
[34mb668477[31m [37mensure auth middleware returns 200 if authorization header is valid - [36mSergio-Pedretti, [32m8 weeks ago
[34m927f8cc[31m [37mensure auth middleware returns 403 if authorization header was not provided - [36mSergio-Pedretti, [32m8 weeks ago
[34m1640d18[31m [37mmove ExpressMiddleware to production files - [36mSergio-Pedretti, [32m8 weeks ago
[34mdf4a8b7[31m [37m ensure ExpressMiddleware adds valid data to req.local - [36mSergio-Pedretti, [32m8 weeks ago
[34m4e8434e[31m [37mensure ExpressMiddleware responds with correct error and statusCode - [36mSergio-Pedretti, [32m8 weeks ago
[34m22c1cdf[31m [37mreorganize beforeAll in ExpressRouter test - [36mSergio-Pedretti, [32m8 weeks ago
[34mfafff10[31m [37misolate sut creation - [36mSergio-Pedretti, [32m8 weeks ago
[34m5245cd6[31m [37mensure express middleware calls handle with correct request - [36mSergio-Pedretti, [32m8 weeks ago
[34m682990f[31m [37mchore: add dotenv and hide keys while changing all exposed - [36mSergio-Pedretti, [32m8 weeks ago
[34m773102e[31m [37mmove AuthenticationMiddleware to production - [36mSergio-Pedretti, [32m8 weeks ago
[34m882cbde[31m [37mensure authorize returns 200 on success - [36mSergio-Pedretti, [32m8 weeks ago
[34mbed8cfa[31m [37mensure AuthorizationMiddleware returns 403 if authorize throws - [36mSergio-Pedretti, [32m8 weeks ago
[34m4de2409[31m [37mensure AuthorizationMiddleware gets called with correct authorization - [36mSergio-Pedretti, [32m8 weeks ago
[34m43a3c15[31m [37misolate sut creation - [36mSergio-Pedretti, [32m8 weeks ago
[34mcb936c6[31m [37mensure AuthenticationMiddleware return 403 case authorization is empty null or undefined - [36mSergio-Pedretti, [32m8 weeks ago
[34m853b429[31m [37mensure JwtTokenHandler throws on incorrect cases - [36mSergio-Pedretti, [32m8 weeks ago
[34mdf33ec1[31m [37mensure JwtTokenHandler returns correct key - [36mSergio-Pedretti, [32m8 weeks ago
[34m50b6143[31m [37morganize JwtTokenHandler code - [36mSergio-Pedretti, [32m8 weeks ago
[34m3c87fe0[31m [37mrename JwtTokenGenerator to JwtTokenHandler - [36mSergio-Pedretti, [32m8 weeks ago
[34m90244c2[31m [37madjust FacebookAuth index export - [36mSergio-Pedretti, [32m8 weeks ago
[34m099ec44[31m [37mmove production code to its own files - [36mSergio-Pedretti, [32m8 weeks ago
[34ma2aa3a4[31m [37mensure Authorize returns AcessToken - [36mSergio-Pedretti, [32m8 weeks ago
[34m983538d[31m [37mensure authorize calls  TokenValidator with correct params - [36mSergio-Pedretti, [32m8 weeks ago
[34m7d8e067[31m [37mmove ExpressRouteAdapter to main layer - [36mSergio-Pedretti, [32m9 weeks ago
[34m74c81c9[31m [37mchange FacebookAuthentication to return DTO instead of Entity - [36mSergio-Pedretti, [32m9 weeks ago
[34me5b2cc7[31m [37mconvert FacebbokAuthenticationUseCase into a function - [36mSergio-Pedretti, [32m9 weeks ago
[34m762ff86[31m [37mrename service to use-cases - [36mSergio-Pedretti, [32m3 months ago
[34mb5c1fe8[31m [37mmove domain errors to entities - [36mSergio-Pedretti, [32m3 months ago
[34m4c20425[31m [37mrename models to entities - [36mSergio-Pedretti, [32m3 months ago
[34ma8da5a0[31m [37mchange data layer to domain - [36mSergio-Pedretti, [32m3 months ago
[34m63d437f[31m [37mmove typeorm config to root folder - [36mSergio-Pedretti, [32m3 months ago
[34m08e3e0a[31m [37mconnect to postgres db before server init - [36mSergio-Pedretti, [32m3 months ago
[34m4553d24[31m [37madd FacebookLogin integration tests - [36mSergio-Pedretti, [32m3 months ago
[34m95d3df5[31m [37mfix ORM call inside functions - [36mSergio-Pedretti, [32m3 months ago
[34m8bed4c0[31m [37mchore install supertest lib - [36mSergio-Pedretti, [32m3 months ago
[34m7a61892[31m [37madd /api from global route - [36mSergio-Pedretti, [32m3 months ago
[34m5bf1332[31m [37mimprove code quality - [36mSergio-Pedretti, [32m3 months ago
[34m44976f6[31m [37mtransform router to function and async await to then catch - [36mSergio-Pedretti, [32m3 months ago
[34ma8dfa28[31m [37mmove ExpressRoter to its own file - [36mSergio-Pedretti, [32m4 months ago
[34m340938b[31m [37mensure ExpressRouter responds with 400 and 500 and invalid data - [36mSergio-Pedretti, [32m4 months ago
[34m81f5373[31m [37mensure ExpressRouter tests have been called once - [36mSergio-Pedretti, [32m4 months 