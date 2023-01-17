# `tp` CLI from Docker

:::warning

For advanced users only. The Power is not responsible for any results of performed actions and possible loss of private keys.

:::

## Introduction

The `tp` CLI is included into `thepowerio/tpnode` Docker image.

With these utilities you won't need to have Erlang installed on your machine. Nevertheless, if you use these utilities without an understanding of actions your perform, you can lose your private keys.

:::note

The commands below are just examples.

:::

## `tp` CLI
Принцип использования данной команды такой же как и teaclient
В отличие от teaclient для работы tp ненужны открытые внешние порты. Поэтому команда запуска может сократиться до:
docker run -it --name tpcli thepowerio/tpnode /bin/bash
В процессе использования утилиты могут создаваться файлы ключей и другие служебные файлы. Все они будут находиться внутри докера и крайне желательно сохранять их резервные копии. Делать это можно как и в случае с teaclient через команду docker cp

Если Вы планируете использовать утилиту tp часто, есть смысл подключить в контейнер отдельный каталог и работать с утилитой из него. Подключить можно например так:
docker run -it --name tpcli --mount type=bind,source=/opt/tpcli,target=/opt/tpcli thepowerio/tpnode /bin/bash
В данном примере каталог хоста /opt/tpcli подключается внутрь докера в /opt/tpcli

PS
Вы наверняка найдёте для себя другие применения утилит встроенных в докер образ thepowerio/tpnode
Нам будет интересно узнать о вашем успешном опыте использования этих утилит
А так же поделитесь с нами вашими замечаниями и бла бла бла
(написать что-то в таком духе)