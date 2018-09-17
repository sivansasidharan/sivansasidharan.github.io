---
layout: post
category: blog
title: "Argus Features For HDP Champlain "
excerpt: "Argus Features"
tags: [bigdata, hive, apache, hortonworks]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

### Argus features for Champlain

- New Components Support
    - Storm Authorization & Auditing ✔
    - Knox Authorization & Auditing ✔
- Deeper Integration with HDP Stack
    - Windows Support
    - Integration with HDFS Auth API ✔
    - Integration with Hive Auth API, support grant/revoke commands ✔
    - Support grant/revoke commands in Hbase ✔
- Enterprise Readiness
    - Rest APIs for policy manager ✔
    - Store Audit logs locally in HDFS ✔
    - Support Oracle DB

#### New Component Support (Storm)

- Storm now support ACLs for authorization

- Argus provides administration for these ACLs, also enables access auditing

- Following permission support are enabled

| Submit Topology   | Get Nimbus Conf |
|-----------------|-----------------|
| Kill topology | Get Cluster Info |
| File Upload  | File Download |
| Activate | Deactivate |
| Get Topology Conf | Get Topology |
| Get User Topology | Get Topology Info |
| Upload New Credential | Rebalance |

#### New Component Support (Knox)
- Knox currently performs service level authorization (perimiter security)
    - Allow group or user access to specific REST API (WebHDFS, WebHcat, JDBC over http etc)
    - Can also restrict based on ip address
    - Permissions maintained in a file

- Manage these permissions through Argus Portal 
    - User experience similar to other components

- Get access to auditing records in Argus portal

***

**Reference www.hortonworks.com**

