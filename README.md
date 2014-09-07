To shut the unicorn server, kill the rals_unicorn master
To restart nginx run  service nginx restart
To start uniicorn in Development environment run  
   unicorn_rails -c config/unicorn.rb -D -E Development

This version uses mongoid 
* mongo v. 2.4.6 
* Ruby v. 2.1.2
* Rails v. 2.3.15

Abilities
===============================================================
To create a new ability run
rails g cancan:ability

Uploaders
===============================================================
gem install carrierwave
rails generate uploader Avatar

