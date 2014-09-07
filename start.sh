cd /3dact/threedact
kill -9 $(pidof unicorn_rails master)
unicorn_rails -c config/unicorn.rb -D -E Development
