To shut the unicorn server, kill the rals_unicorn master
To restart nginx run  service nginx restart
To start uniicorn in Development environment run  
   unicorn_rails -c config/unicorn.rb -D 
To rebuild run bundle update

This version uses mongoid 
* mongo v. 2.4.6 
* Ruby v. 2.1.2
* Rails v. 2.3.15

Miscellaneous
===============================================================
The misc directory contains the vim viewer plugins config
(to open run vim ~/.vimrc, install vundle and activate bundles)
As well as nginx reverse proxy for ruby configured in virtual.conf
(this one normally goes to /etc/nginx/conf.d/virtual.conf)
Please install nginx to apply those configurations
 
Abilities
===============================================================
To create a new ability run
rails g cancan:ability

Uploaders
===============================================================
gem install carrierwave
rails generate uploader Avatar

