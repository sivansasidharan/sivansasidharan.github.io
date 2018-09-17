---
layout: post
category: blog
title: "Cluster Validation - Ambari - HDP"
excerpt: "Cluster validation methodologies & ambari checklist"
tags: [bigdata, hive, apache, hortonworks]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

For every PS engagement that involves installation, upgrade, or migration, it is your responsibility to ensure that the installation validation checklist is completely executed.This will ensure:
- Proper configuration of the cluster
- Increased customer satisfaction
- Decreased volume to the Technical Support team

> The Importance of the Checklist

The installation validation checklist is a tool that you should refer to throughout the duration of your engagement.It was assembled by the Technical Support team and contains information and best practices gathered while working on multiple projects with multiple clients.The checklists provide information on key areas that you should focus on to ensure proper configuration of the components of your cluster. This will result in an operational Customer Environment.

#### Ambari Checklist Items

There are multiple items that should be checked to ensure that Ambari is configured properly. The table below provides the key areas of focus, along with the rationale behind them:

| **Checklist Item**                                                            | **Notes/Rationale**                                                                                                                                                                                                                                                                                                                                                                                               |
|:------------------------------------------------------------------------------ |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   |
| **Verify that the Ambari UI is up**                                           | It is important to check if the Ambari UI is accessible and responsive. For additional details, refer to the section of this lesson titled, “Verifying that the Ambari UI is Up.”                                                                                                                                                                                                                                 |
| **Verify that all services Start/Stop and that the smoke test passes**        | It is important to verify that all services are in “Green” status. Perform the following actions:In the Ambari UI, verify that all services are in the “Green” statusFor each service, run the service check, all should return a “Green” statusIf any of the services do not return a “Green” status, examine the logs for potential issues. If the cause of the issue is still unclear, open a support case.    |
| **Verify that the live number DN and NM are matched to the NN and RM UI**     | Information presented by Ambari and by NN/RM UIs should match the real status for running DN/NM processes.                                                                                                                                                                                                                                                                                                        |
| **Verify that there are no nodes with lost heartbeats or other errors**       | A lost heartbeat may be the reason for false alarms. They can be caused by several factors, including:A slow networkNodes overloading (specifically an Ambari server node overload)An actual node being downAn Ambari agent process being down                                                                                                                                                                    |
| **Verify that unneeded nodes are removed**                                    | If a node is dead and cannot be revived or if the node is decommissioned, it should be removed from Ambari to avoid any confusion and/or false alerts.                                                                                                                                                                                                                                                            |
| **Verify that Ambari is upgraded to the latest stable release**               | Ambari should be on the latest release certified for running the HDP stack. For additional details, refer to the section of this lesson titled, “Verifying that Ambari is Upgraded to the Lastest Stable Release.”                                                                                                                                                                                                |
| **Verify that all graphs are working as expected in the Ambari UI**           | If the graphs are not present, this may be due to:An incorrect name resolutionWrong network interface bindings                                                                                                                                                                                                                                                                                                    |
| **Verify that Nagios or Ganglia alerts are resolved**                         | These alerts should be resolved because they are an indication that there are issues in the cluster.                                                                                                                                                                                                                                                                                                              |
| **Verify that any customizations during the install process are documented**  | Be sure to document any customizations so to that the support team is aware of changes to LDAP, proxies, HTTPS, etc.                                                                                                                                                                                                                                                                                              |

***

#### Verifying that the Ambari UI is up
In addition to verifying the other items on the checklist, it is important to check if the Ambari UI is accessible and responsive. Below are the actions you should take to ensure that the UI is functioning properly:
First, go to http://<ambari-server-host>:8080; you should see a login dialog. If you do not see the login dialog, use the table below to troubleshoot the issue:

| **If…**                                                                 | **Then…**                                                                     |
|:-------------------------------------------------------------------------|:-------------------------------------------------------------------------------|
| There is no response when you try to access the UI                      | SSH into the Ambari server node and verify that the server is running using:  
                                                                           Netstat –apnl | grep 8080, ps –ef | grep Ambari                                |
| The process is running but listening on the wrong host name             | Adjust the name resolution                                                    |
| The process is not running                                              | Start the process                                                             |
| The process is running (and on the right port) but not responding       | Restart the process                                                           |
| There is still no response after the restart                            | Examine the log files                                                         |
| The log files do not reveal any information related to potential issues | Open a support case and engage the Ambari development team                    |

***

### Verifying that Ambari is Upgraded to the Latest Stable Release
Ambari should be on the latest release certified by the HDP stack. Please refer to the table below:

| **Ambari** | **HDP 2.2**                                                                                   | **HDP 2.1** | **HDP 2.0** | **HDP 1.3** |
|:------------|:-----------------------------------------------------------------------------------------------|:-------------|:-------------|:-------------|
| 1.7.0      | X                                                                                             | X           | X           | X           |
| 1.6.1      |                                                                                               | X           | X           | X           |
| 1.6.0      |                                                                                               | X           | X           | X           |
| 1.5.1      |                                                                                               | X           | X           | X           |
| 1.5.0      |                                                                                               |             | X           | X           |
| 1.4.4.23   |                                                                                               |             | X           | X           |
| 1.4.3.38   |                                                                                               |             | X           | X           |
| 1.4.2.104  |                                                                                               |             | X           | X           |
| 1.4.1.61   |                                                                                               |             | X           | X           |
| 1.4.1.25   |                                                                                               |             | X           | X           |
| 1.2.3.17   |                                                                                               |             |             | X           |

 -   Ambari 1.7x does not install Accumulo, Hue, Ranger or Solr services for the HDP 2.2 Stack
- Ambari 1.7x does not install Accumulo, Hue, Knox or Solr services for the HDP 2.1 Stack
- Ambari 1.7.x does not install Hue for the HDP 2.0 Stack

***


