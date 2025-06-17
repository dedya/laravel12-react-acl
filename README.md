## Laravel React ACL

This application is a basic laravel 12, react ACL, which contains : 
- Login Page
- User Administration
- Role Administration with permission

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
