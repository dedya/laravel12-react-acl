## Laravel React ACL

This application is a basic laravel 12, react ACL, which contains : 
- Login Page
- User Administration
- Role Administration with permission

Using these libraries : 
- Spatie Laravel permissions (https://spatie.be/docs/laravel-permission/v6/introduction)
- Spatie Laravel activitylog (https://spatie.be/docs/laravel-activitylog/v4/introduction)
- Spatie Laravel media library (https://spatie.be/docs/laravel-medialibrary/v11/introduction)
- Spatie Laravel settings (https://github.com/spatie/laravel-settings)
- Laravel React i18n (https://github.com/EugeneMeles/laravel-react-i18n)

To setup : 
- Clone the source 
- Run 'composer update'
- Run 'npm install'
- run 'php artisan migrate' to apply db changes
- run 'php artisan db:seed --class=RolesAndPermissionsSeeder' to input role data
- run 'php artisan db:seed --class=AdminRolesAndPermissionsSeeder' to input admin user
- run 'php artisan db:seed --class=UserSeeder' to 20 sample user if needed (optional)
- Copy .env.example to .env
- Update the .env
- empty folder ./bootstrap/cache
- run : php artisan storage:link , to publish upload folder
- run : php artisan optimize, to apply changes in .env

To run : 
- Laravel : php artisan serve
- React : npm run dev
- open http://localhost:8000/
- admin login :
    - Email : dedy.adhiewirawan@gmail.com
    - Password : admin
