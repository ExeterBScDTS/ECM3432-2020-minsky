# Automated deployment scripts

These scripts are called by the Travis system, see <https://travis-ci.com/github/ExeterBScDTS/ECM3432-2020-minsky>

The GitHub repository for this project is configured to provide public access to releases at <https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases>

To enable easy updating of the deployed software the application takes advantage of the fact that the URI <https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest> will redirect to a URI which ends ```/tag/{TAGNAME}``` eg. ```/tag/v1.0.0```  The ```TAGNAME``` is then used to build the correct URI to pull down the latest release and install it.

Although the above technique allows the application to download the latest release, as a WAR file, it's also useful to know which release is currently installed. To achieve this I've decided to use the TAGNAME when deploying from Travis. 

```sh
TAGNAME=`git describe --tags --abbrev=0`
```