# Getting Started with Adobe I/O Runtime
This exercise describes how  you can get started using Adobe I/O Runtime.

## Objective
The objective of this lab is to set you up and get you familiar with Adobe I/O Runtime


## Getting Access
The first step is to have a Adobe I/O Runtime namespace properly configured. For this lab, we will use a dedicated namespace, named *summit-emea-lab-unlock-adobeio-namespace*. 
Access to a namespace is handled by an authentication code. In our case, the authentication code is *b182d3d0-bc54-4bce-b64d-a8c1a6189a43:saGSKEX9GNlGl57mDYpPioe7T41ApMa7KphmmltVGKWfmkmFYNFZZTlYFHf0eR0R*.

## Configuring 
Interacting with Adobe I/O runtime currently requires the OpenWhisk CLI (command line interface) as it is based upon IBM OpenWhisk. More modern UI's and consoles are in development. You can [download the binary](https://github.com/apache/incubator-openwhisk-cli/releases) or build it yourself. For the purpose of this lab we have already installed it on your lab machines. It is available through the command line using the Terminal application on your Mac, e.g. 

```
$ wsk

        ____      ___                   _    _ _     _     _
       /\   \    / _ \ _ __   ___ _ __ | |  | | |__ (_)___| | __
  /\  /__\   \  | | | | '_ \ / _ \ '_ \| |  | | '_ \| / __| |/ /
 /  \____ \  /  | |_| | |_) |  __/ | | | |/\| | | | | \__ \   <
 \   \  /  \/    \___/| .__/ \___|_| |_|__/\__|_| |_|_|___/_|\_\
  \___\/ tm           |_|

Usage:
  wsk [command]

Available Commands:
  action      work with actions
  activation  work with activations
  api         work with APIs
  help        Help about any command
  list        list entities in the current namespace
  namespace   work with namespaces
  package     work with packages
  property    work with whisk properties
  rule        work with rules
  sdk         work with the sdk
  trigger     work with triggers

Flags:
      --apihost HOST         whisk API HOST
      --apiversion VERSION   whisk API VERSION
  -u, --auth KEY             authorization KEY
      --cert string          client cert
  -d, --debug                debug level output
  -h, --help                 help for wsk
  -i, --insecure             bypass certificate checking
      --key string           client key
  -v, --verbose              verbose output

Use "wsk [command] --help" for more information about a command.
```

Once you have verified access to the CLI, you need to configure it. This is done by creating a *.wskprops* file in your user home directory and fill it with variables mentioned above. The *.wskprops* file is already configured for you but in case you would like to reconfigure it, you can either edit the *.wskprops* file directly or you can use the `wsk` command below to configure it:

```
wsk property set --apihost runtime.adobe.io --auth b182d3d0-bc54-4bce-b64d-a8c1a6189a43:saGSKEX9GNlGl57mDYpPioe7T41ApMa7KphmmltVGKWfmkmFYNFZZTlYFHf0eR0R --namespace summit-emea-lab-unlock-adobeio-namespace
```

## Packages
As we all share the same Adobe I/O runtime environment we have to work with packages to separate the work each team is doing. We have assigned each computer a seat number (ranging from 01-50) and **it is very important** you  use this seat number in all remaining exercises.

You can get an overview of all the packages in the environment using the following command:
````
wsk package list --limit 100
````
You will see output like:
````
ridm-macbookpro:summitlabtl13 rmaur$ wsk package list --limit 100
packages
/summit-emea-lab-unlock-adobeio-namespace/seat00                       private
/summit-emea-lab-unlock-adobeio-namespace/seat50                       private
/summit-emea-lab-unlock-adobeio-namespace/seat49                       private
/summit-emea-lab-unlock-adobeio-namespace/seat48                       private
/summit-emea-lab-unlock-adobeio-namespace/seat47                       private
/summit-emea-lab-unlock-adobeio-namespace/seat46                       private
/summit-emea-lab-unlock-adobeio-namespace/seat45                       private
/summit-emea-lab-unlock-adobeio-namespace/seat44                       private
/summit-emea-lab-unlock-adobeio-namespace/seat43                       private
/summit-emea-lab-unlock-adobeio-namespace/seat42                       private
/summit-emea-lab-unlock-adobeio-namespace/seat41                       private
/summit-emea-lab-unlock-adobeio-namespace/seat40                       private
...
````


## Testing
Once you've configured the CLI, you can create your first function to make sure it's working. 

Start by creating a file called `hello.js` with the following content

```
function main(params) {
   return {payload: 'Hello ' + params.name};
}
```
or inspect the file in the *intro* directory of the cloned Git repository.

Next, create the action on Runtime (where `seatXX` indicates your seat number, e.g. `seat01`: 
````
wsk action create seatXX/hello hello.js
````
If it's successful, you should see 
```
ok: created seatXX/action hello
```

Lastly, invoke the function:
```
wsk action invoke --result seatXX/hello --param name <your name>
```
You should see the following output:
```
{
    "payload": "Hello Rob"
}
```

## Finishing Up
With that you should be all set up for the remainder of this lab.

## What's Next?
* [Exercise 2: Using Hubspot with Adobe I/O Runtime](../hubspot/)





