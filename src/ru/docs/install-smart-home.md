---
title: Установка умного дома
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt
---

**Добро пожаловать в руководство по установке Home Assistant с интеграцией Robonomics. Home Assistant - это система умного дома с открытым исходным кодом, которая предоставляет централизованный хаб для управления умными устройствами в домашней сети. Интегрируясь с Robonomics, децентрализованным облачным сервисом, вы можете улучшить функциональность и безопасность вашего умного дома. В этой статье мы предоставим пошаговые инструкции по установке Home Assistant с Robonomics, давая вам возможность автоматизировать и контролировать различные аспекты вашего дома с использованием безопасного и децентрализованного решения. Давайте начнем!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## Демонстрация

Вот пример полной установки интеграции умного дома и Robonomics. Имейте в виду, что необходимое время может изменяться в зависимости от Подключение к интернету.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Аппаратное обеспечение, необходимое для установки

Если вы еще не интегрировали Home Assistant в свою систему умного дома, важно знать об оборудовании, которое вам понадобится для создания полной системы умного дома с нуля. Команда Robonomics рекомендует использовать Raspberry Pi 4 в качестве сервера для умного дома. **Но также можно настроить все на своем ПК.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (как минимум 2 ГБ ОЗУ)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта 16 Гб</b> {% endroboWikiGrid %}{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Адаптер Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Умные устройства Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Компьютер для настройки</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Установка предварительных требований

Robonomics Docker содержит:
- Home Assistant
- IPFS
- MQTT брокер и интеграцию- Zigbee2MQTT
- прокси libp2p
- Интеграция Robonomics

Эта статья покажет процесс установки на системе Ubuntu. Сначала вам нужно установить следующие пакеты:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Затем вам нужно установить Docker на ПК. Инструкцию по установке можно найти на [официальном веб-сайте](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Важная информация" }%} Добавьте своего пользователя в группу docker, чтобы запускать контейнеры Docker без прав root. Инструкцию можно найти [здесь](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Настройка

Загрузите репозиторий GitHub и перейдите внутрь него:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Затем создайте файл `.env` из `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

После этого вы можете открыть файл `.env` и отредактировать значения по умолчанию, такие как:
- путь к репозиторию, где будут храниться все папки конфигураций.
- часовой пояс в ["имя базы данных tz"](https://en.wikipedia.org/wiki[List_of_tz_database_time_zones).

## 3. Начало

Запустите bash-скрипт и дождитесь установки всех необходимых пакетов:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Скрипт проверит все необходимые действия, которые вы выполнили на предыдущих этапах, и выдаст ошибку, если что-то не так.

Во время процесса установки могут возникнуть следующие ситуации:
- Если вы решите не использовать координатор Zigbee, вы увидите диалоговую строку, подтверждающую, хотите ли продолжить установку:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (Y/n)
```

{% endcodeHelper %}


- Если на вашем компьютере есть несколько устройств, использующих последовательные порты, скрипт спросит, какое устройство использовать:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Пост-установка

После того, как всё запустится, вы можете использовать скрипт `update.sh` для обновления версии пакетов Docker. Этот скрипт загрузит новые версии, удалит старые версии пакетов и автоматически перезапустит всё, сохраняя все ваши конфигурации.

Чтобы остановить всё, используйте скрипт `stop.sh`.

Это всё. Продолжайте к следующей статье.