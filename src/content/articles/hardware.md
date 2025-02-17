---
title: 'Motors, servos, and more!'
description: 'The soul of programming your robot starts with its motors, servos and other hardware'
heroImage: '/first/basicsbanner.png'
publishDate: 'Feb 17 2025'
tags: ['article', 'basics']
---

This article provides a basic introduction to the most common hardware you'll use while programming for your robot. If you think about it, every subsystem you can imagine on your robot is a combination of the hardware talked about here. **Without further ado**, lets get started.

<img src="https://imgs.xkcd.com/comics/robotic_garage.png">

*Robotic Garage [https://xkcd.com/1651/]("https://xkcd.com/1651/") (Credit to xkcd.com)* 

# Instantializing Hardware

All hardware is fundamentally instantiated[^1] in the same way.

Hardware is grabbed from the **hardwareMap** using a name assigned in the robot's [:configuration]("#WIP"). This name can differ from the variable's name. 

If there are multiple of the same name inside the configuration, **the hardwareMap retrieves the first one**. 

If there are no matching names, **the hardwareMap throws an error**.[^2]. A **huge** source of errors comes from either not setting the names of your hardware or searching for hardware names that no longer exists.

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

You may also set the direction of both motors and servos using the **setDirection()** method.


# Motors
A simple motor rotates when given power with the **setPower()**.

Some motors may have an additional port alongside their power cables that allows the REV Control Hub to read the "current position" of the motor **a.k.a an encoder**.

Beyond that there a ways to customize your motor at initialization.
## Run Mode
The Run Mode of the motor determines the behaviour when power is given to the motor.
It can be set during initialization before your opMode is run using the **setMode()** method and passing a valid DcMotor RunMode as an argument.

**Remember it is always important to explicitely set your RunMode (and ZeroPowerBehaviour), don't leave things up to interpretation**
| Name     | Description |
| -------- | ----------- |
| RUN_TO_POSITION  | Attempts to move the motor towards a specified target position, specified using setTargetPosition() *requires encoders* |
| RUN_USING_ENCODER  | Attempts to move the motor towards a specified velocity *requires encoders* |
| RUN_WITHOUT_ENCODER    | Runs the motor at whichever given power irregardless of velocity |
| STOP_AND_RESET_ENCODER | Sets the motor's encoder reading to 0 at the current position |

## Zero Power Behaviour
The Zero Power Behaviour determines the behaviour of the motor when the power is set to zero (duh).
It can set during initialization before your opMode is run using the **setZeroPowerBehaviour()** method and passing a valid DcMotor ZeroPowerBehaviour as an argument.
| Name     | Description |
| -------- | ----------- |
| BRAKE  | The motor stoops and resists forces from moving the motor |
| FLOAT  | The motor stops and floats, it does not resist forces from moving |
| UNKNOWN    | OpMode doesn't know :( |

## Encoders
Most motors allow an additional cable known as an "encoder cable" to be plugged into the Control Hub. This allows the position of the motor to be read using the **getCurrentPosition()** method.

This allows for interesting, more advanced control schemes in the future.

```java
DcMotor myMotor;
...

public void runOpMode(){
    myMotor = hardwareMap.get(DcMotor.class, "motorName");

    // Set your RunMode and ZeroPowerBehaviour explicitly
    myMotor.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
    myMotor.setZeroPowerBehaviour(DcMotor.ZeroPowerBehaviour.BRAKE); 

    myMotor.setDirection(DcMotor.Direction.FORWARD); // You can reverse this to make power values line up nicely!

    waitForStart(); 

    if(gamepad1.a){
        myMotor.setPower(0.5); // Gives 1/2 power to the motor when the A button is held.
    }else{
        myMotor.setPower(0); // Forgetting to set your power back to 0 is a common beginner mistake!
    }

    ...// The rest of your opMode
}

```

# Servos
There are two types of servos able to be readily utilized by the FTC Robot Controller App: Servo-Mode Servos and Continuous Servos.

## Servo-Mode Servo
A servo-mode servo is defined using the **Servo** class in the SDK. Servos are able to rotate from positions 0.0 - 1.0, the actual range of motion depends heavily on the brand and type of servo,
however most servos are able to rotate with **300 degrees** of articulation.

The rotation of the servo can be set using the **setPosition()** method.

Servos are able to report their last commanded position using **getPosition()**[^3]

## Continuous Servo
A continuous servo also known as a continuous-rotation servo is defined using the **CRServo** class in the SDK. Continuous servos are able to rotate a **complete 360 degrees** and depend on
setting the amount of power given to the servo, similar to a DcMotor.

The amount of power given to the servo can be set using the **setPower()** method.

```java
Servo myServo;
CRServo myCRServo;
...

public void runOpMode(){
    myServo = hardwareMap.get(Servo.class, "servoName");
    myCRServo = hardwareMap.get(CRServo.class, "crservoName");

    myServo.setDirection(Servo.Direction.FORWARD); // Directions can be set on both types of servo
    myCRServo.setDirection(Servo.Direction.FORWARD); 

    waitForStart(); 

    if(gamepad1.a){
        myCRServo.setPower(0.5); // Gives 1/2 power to the servo when the A button is held.
    }else{
        myCRServo.setPower(0); // Forgetting to set your power back to 0 is a common beginner mistake!
    }

    if(gamepad1.b) myServo.setPosition(Servo.MIN_POSITION) // Sets the servo to it's minimum position (farthest from its maximum)
    if(gamepad1.x) myServo.setPosition(Servo.MAX_POSITION) // Sets the servo to it's maximum position

    ...// The rest of your opMode
}

```

[^1]: Started/created. In java this means creating an object.
[^2]: Specifically, an IllegalArgumentException
[^3]: This only reports the last __assigned__ position. It may not necessarily reflect the real position of the servo in realtime, especially if your servo is broken.
