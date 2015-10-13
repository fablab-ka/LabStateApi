FROM jprjr/tinynode

Add . /home/default/app

WORKDIR /home/default/app

CMD ["start", "bin/www", "--minUpTime", "1000"]