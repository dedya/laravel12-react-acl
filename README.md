## Laravel React ACL

Server requirement : 
- >= PHP 8.2
- >= Node 16
- >= MySQL / PostgreSQL

This application is a basic laravel 12, react ACL, which contains : 
- Login Page
- User Administration
- Role Administration with permission

Using these libraries : 
- For user role permission : Spatie Laravel permissions (https://spatie.be/docs/laravel-permission/v6/introduction)
- For user activity logs : Spatie Laravel activitylog (https://spatie.be/docs/laravel-activitylog/v4/introduction)
- For media library, to handle uploaded files across models : Spatie Laravel media library (https://spatie.be/docs/laravel-medialibrary/v11/introduction)
- For application settings : Spatie Laravel settings (https://github.com/spatie/laravel-settings)
- For language localization : Laravel React i18n (https://github.com/EugeneMeles/laravel-react-i18n)

To setup : 
- Clone the source 
- Run 'composer update'
- Run 'npm install'
- Copy .env.example to .env
- Update the .env
- empty folder ./bootstrap/cache
- run 'php artisan optimize'
- run 'php artisan migrate' to apply db changes
- run 'php artisan db:seed --class=RolesAndPermissionsSeeder' to input role data
- run 'php artisan db:seed --class=AdminRoleAndPermissionSeeder' to input admin user
- run 'php artisan db:seed --class=UserSeeder' to 20 sample user if needed (optional)
- run : php artisan storage:link , to publish upload folder
- run : php artisan optimize, to apply changes in .env

To run : 
- Laravel : php artisan serve
- React : npm run dev
- open http://localhost:8000/
- admin login :
    - Email : dedy.adhiewirawan@gmail.com
    - Password : admin
