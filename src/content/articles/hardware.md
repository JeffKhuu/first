---
title: 'Motors, servos, and more!'
description: 'The soul of programming your robot starts with its motors, servos and other hardware'
heroImage: '/first/basicsbanner.png'
publishDate: 'Feb 3 2025'
tags: ['featured', 'article', 'basics']
---

This article provides a basic introduction to the most common hardware you'll use while programming for your robot. If you think about it, every subsystem you can imagine on your robot is a combination of the hardware talked about here. **Without further ado**, lets get started.

<img src="https://imgs.xkcd.com/comics/robotic_garage.png">

*Robotic Garage [https://xkcd.com/1651/]("https://xkcd.com/1651/") (Credit to xkcd.com)* 

# Instantializing Hardware

All hardware is fundamentally instantiated[^1] in the same way.

Hardware is grabbed from the **hardwareMap** using a name assigned in the robot's [:configuration]("#WIP"). This name can differ from the variable's name. 

If there are multiple of the same name inside the configuration, **the hardwareMap retrieves the first one**. 

If there are no matching names, **the hardwareMap throws an exception**.[^2]. A **huge** source of error comes from either not setting the names of your hardware or searching for hardware that no longer exists.

```java
HardwareClass name; 
DcMotor myMotor;

public void runOpMode(){
    // This is a generic template
    name = hardwareMap.get(HardwareClass.class, "name-in-configuration"); 
    myMotor = hardwareMap.get(DcMotor.class, "motorLeft"); // This is an example w/ a motor!

    ... // The rest of your opMode!
}

```

# Motors
The motor is the most straight-forward piece of hardware. You give it power, it spins. :-)

Okay maybe a little more than that. The biggest issues I've had with motors is not properly setting their **runMode**.

[^1]: Started/created. In java this means creating an object.
[^2]: Specifically, a _____ exception
