To shut the unicorn server, kill the rals_unicorn master
To restart nginx run  service nginx restart
To start uniicorn in Development environment run  
   unicorn_rails -c config/unicorn.rb -D -E Development

This version uses mongoid based on mongo 2.4.6 and Rails 2.3.15
