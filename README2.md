# generate module
- nest g controller cats
- nest g resource users
- To avoid generating test files, you can pass the --no-spec flag, as follows: nest g resource users --no-spec
- Bir dizin içerisine "resource" generate etme => nest g resource app/modules/auth --no-spec
- Bir dizin içerisine "resource" generate etme => nest g resource app/modules/admin/user --no-spec
- Guard oluşturmak: nest g guard roles
- Decorator oluşturmak: nest g decorator roles

# installed
- npm install --save @nestjs/mongoose @types/bcrypt mongoose bcrypt
- npm install --save @nestjs/passport passport passport-local
- npm install --save-dev @types/passport-local
- npm install --save @nestjs/jwt passport-jwt
- npm install --save-dev @types/passport-jwt