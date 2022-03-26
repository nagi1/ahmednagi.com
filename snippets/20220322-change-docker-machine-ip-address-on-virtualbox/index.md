---
title: Change docker machine ip address on virtualbox
image: /covers/change-ip-address.png
layout: Snippet
permalink: snippets/docker-machine-change-ip
date: 2022-03-22 16:00
tags:
  - snippet
  - Docker
  - virtualbox
  - Network
---

The default docker machine ip range in 192.168.99.103 and this ip most of the times isn't available on your network for other devices.

Changing Docker machine is tricky and can cause a lot of problems. Here's the summery of hours and hours of debugging.

## My Goal

- ✅ Change docker machine ip to `10.10.1.236`
- ✅ Make docker machine available to the devices on the network.

## Things to check before proceeding

- ✅ Check that the ip you want is available on the network and not assigned to another device.
- ✅ Docker toolbox is installed
- ✅ Default machine is created on virtualbox and working correctly

### Step 1: Make ip static for the Host-only adapter

- Open VirtualBox -> file -> Host Network Manager

![step 1](/uploads/change-docker-ip/1.png)

- Change on of the Host-only adapter `VirtualBox Host-Only Eithernet #2` to your the ip in this case `10.10.1.236`.
- Disable DHCP SERVER for all VirtualBox adapters it's not good for docker!

![step 2](/uploads/change-docker-ip/2.png)

### Step 2: Assign Default machine to the correct adapter

![step 3](/uploads/change-docker-ip/3.png)

If you want this machine to have access to the internet assign adapter 1 as `Bridged Adapter`

![step 4](/uploads/change-docker-ip/5.png)

### Step 3: Enable Adapter as NAT to use port-farwarding

**Warning this step is too manual!** You need to list all port you'll be using in that docker machine.

Here I'm using ports 80, 433, and 6001 for websockets. What matters here is ssh port that docker uses on your machine to connect to the docker instance in the virtual machine. you can find this port by execting the following command and the copy the output ip and port.

```sh
docker ps
```

### Step 4: Inform Docker with the new ip

Boot2docker will look for a file called `bootsync.sh` when booting, we'll use this file to execute this command on the virtual machine directly:

```bash
echo "kill \$(cat /var/run/udhcpc.eth0.pid); kill \$(cat /var/run/udhcpc.eth1.pid); ifconfig eth1 10.10.1.236 netmask 255.255.255.0 broadcast 10.10.1.255 up" | sudo tee /var/lib/boot2docker/bootsync.sh > /dev/null
```

#### Some explanation for the command above ☝

- `kill cat /var/run/udhcpc.eth0.pid` Kill the DHCP server for the adapter 1 (bridged connection)
- `kill cat /var/run/udhcpc.eth1.pid` Kill the DHCP server for the adapter 2 (Host Only Adapter)
- `ifconfig eth1 10.10.1.236 netmask 255.255.255.0 broadcast 10.10.1.255 up` force eth1 (the host only adapter) to assigned the ip `10.10.1.236`. **Please note here that you need to replace the ip `10.10.1.236` with the ip you want!**

![step 6](/uploads/change-docker-ip/6.png)

### Step 5: Restart the virtual machine

Use the comments bellow 👇 to ask me anything. I'll answer all of your questions.
