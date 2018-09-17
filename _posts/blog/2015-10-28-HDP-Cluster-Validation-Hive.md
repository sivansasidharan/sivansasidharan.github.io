---
layout: post
category: blog
title: "Cluster Validation - Hive - HDP"
excerpt: "Cluster validation methodologies & Hive checklist"
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

***

#### Locating the Validation Scripts

You can download the scripts from GitHub using the links below:
Scripts Used to Test and Validate Hive:
- Download the hdp-hive-validation.tgz file using the link below. It contains all the scripts and required libraries and needs to be copied to an edge node on the cluster that is being validated.
>https://github.com/dstreev/hdp-validation/tree/master/dist

Hortonworks Data Platform Data Generation Tool:
- Download the Hortonworks Data Platform Data Generation Tool. It is used to generate sample datasets used by the validation scripts. It is included in the above referenced tarball, but the sources can be downloaded using the link below.

> https://github.com/dstreev/hdp-data-gen

***

#### 1. Running the HDP Configuration Utility

Before you start any testing and before the cluster is turned over to the customer, run the HDP Configuration Utility with the clusters specification and apply the settings. The utility is a python script so it can be run on your local laptop to get the appropriate settings.These settings can then be applied to the cluster through Ambari. 

You will need to provide these settings to the customer as a baseline for future support. 
The utility can be downloaded from GitHub using the link below:
>HDP Configuration Utility:
    https://github.com/hortonworks/hdp-configuration-utils

***

#### 2. Hive Metastore and HS2 Validation

The hive heap size by default is set to 1024, but for clusters that are more than a simple POC, this is not usually enough. If the system is going to have concurrent users (against HS2), the Hive Metastore and HiveServer2 daemons should be setup with at least 4 GB of memory. This will give the HS2 server the room it needs to handle this load.

If the user will be extracting LARGE datasets through the HS2 interface, this value may need to be higher, as HS2 is the conduit for channeling all of that data back to the client. With concurrent user requests, HS2 can quickly become the bottleneck.

**Note**
Changing this value WILL effect ALL “hive cli” clients, which will start with the same memory settings. It is suggested that you create a Managed Config Group in Ambari to set these values for the HS2 server, independently.

>To validate this, use the Ambari REST API via the Ambari “config.sh” script:
    cd /var/lib/ambari-server/resources/scripts
    ./configs.sh -u <ambari-user> -p <ambari-password> get <AMBARI_HOST> <CLUSTER_NAME> hive-site | grep hive.heapsize
    

The value returned after running the script should be greater than 4096.

***

#### 3. Verifying HiveServer2 is Running in Embedded Metastore Mode
There are several best practices that you can follow to verify that HiveServer2 is running in embedded metastore mode:
- It is important to use netstat to check if the process is making a call to 9083.
- HiveServer2 startup via Ambari uses a template file to override the values you will see for `hive.metastore.uris` set in the Ambari UI for `hive-site.xml`. This file is located in the Ambari Resource Stack if you would like to examine the contents.

** Patch for HS2 Embedded Metastore **
>For Ambari versions previous to 1.7.0, you will not be able to get HS2 to run with an Embedded Metastore

Apply the following patch :

{% highlight css %}
diff --git a/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/HIVE/package/templates/startHiveserver2.sh.j2 b/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/HIVE/package/templates/startHiveserver2.sh.j2
index 62ab19e..a8fe21c 100644
--- a/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/HIVE/package/templates/startHiveserver2.sh.j2
+++ b/ambari-server/src/main/resources/stacks/HDP/2.0.6/services/HIVE/package/templates/startHiveserver2.sh.j2
@@ -19,11 +19,11 @@
 #
 #
  
-HIVE_SERVER2_OPTS=" -hiveconf hive.metastore.uris=\" \" -hiveconf hive.log.file=hiveserver2.log -hiveconf hive.log.dir=$5"
+HIVE_SERVER2_OPTS=" -hiveconf hive.log.file=hiveserver2.log -hiveconf hive.log.dir=$5"
 {% if hive_authorization_enabled == True and str(hdp_stack_version).startswith('2.1') %}
 # HiveServer 2 -hiveconf options
 HIVE_SERVER2_OPTS="${HIVE_SERVER2_OPTS} -hiveconf hive.security.authenticator.manager=org.apache.hadoop.hive.ql.security.SessionStateUserAuthenticator -hiveconf hive.security.authorization.manager=org.apache.hadoop.hive.ql.security.authorization.plugin.sqlstd.SQLStdHiveAuthorizerFactory "
 {% endif %}
  
-HIVE_CONF_DIR=$4 /usr/lib/hive/bin/hiveserver2 ${HIVE_SERVER2_OPTS} > $1 2> $2 &
+HIVE_CONF_DIR=$4 /usr/lib/hive/bin/hiveserver2 -hiveconf hive.metastore.uris=" " ${HIVE_SERVER2_OPTS} > $1 2> $2 &
 echo $!|cat>$3
{% endhighlight %}

>For Ambari 1.7.0 and above, a simple validation test can be performed by, “Shutting Down” the Hive Metastore instance and then trying to connect to HS2 via Beeline. You can then run a few commands to exercise metastore access. Remember to restart the Hive Metastore to support Hive CLI calls.

***

** Connectivity Check From Hive Server to Metastore Database **
When starting the Hive Metastore, if you receive any error( issues in connecting to DB ), you should check that the Metatstore database is reachable from the replacement host.

You can run the following from the command line on the replacement host to check connectivity to the Metastore database. Correct any errors and then attempt to start the Hive Metastore again:
{% highlight css %}
/usr/lib/hive/bin/schematool -initSchema -dbType mysql -dryRun -verbose -userName hive -passWord hivepwd
{% endhighlight %}

***

#### 4. Setting Up an Additional Queue for Hive Testing

An additional queue should be set up so that it can be used later to ensure that Hive can run jobs against a queue other than the default queue. In Ambari, add an additional entry for an “Alt” queue. Be sure to restart YARN and validate that the queue has been registered via the Resource Manager interface.
Below are the Capacity Schedule Settings that you should use via Ambari:

{% highlight css %}
yarn.scheduler.capacity.maximum-am-resource-percent=0.2
yarn.scheduler.capacity.maximum-applications=10000
yarn.scheduler.capacity.node-locality-delay=40
yarn.scheduler.capacity.root.acl_administer_queue=*
yarn.scheduler.capacity.root.alt.acl_administer_jobs=*
yarn.scheduler.capacity.root.alt.acl_submit_applications=*
yarn.scheduler.capacity.root.alt.capacity=20
yarn.scheduler.capacity.root.alt.maximum-capacity=50
yarn.scheduler.capacity.root.alt.state=RUNNING
yarn.scheduler.capacity.root.alt.user-limit-factor=1
yarn.scheduler.capacity.root.capacity=100
yarn.scheduler.capacity.root.default.acl_administer_jobs=*
yarn.scheduler.capacity.root.default.acl_submit_applications=*
yarn.scheduler.capacity.root.default.capacity=80
yarn.scheduler.capacity.root.default.maximum-capacity=100
yarn.scheduler.capacity.root.default.state=RUNNING
yarn.scheduler.capacity.root.default.user-limit-factor=1
yarn.scheduler.capacity.root.queues=default,alt
yarn.scheduler.capacity.root.unfunded.capacity=50 
{% endhighlight %}

***

#### 5. Hive Ecosystem Validation Preparation

Listed below are some of the steps you can take in order to prepare the Hive Ecosystem for validation:

- Select an edge node or some cluster machine to prepare the test datasets
- Download the `hdp-hive-validation.tgz`  package (https://wiki.hortonworks.com/download/attachments/7310572/hdp-hive-validation.tgz?version=2&modificationDate=1418506590000&api=v2)
- Copy the home directory of the “Hive” user on the edge node
- Unzip the `hdp-hive-validation.tgz` package in the Hive users home directory

The `hdp-hive-validation.tgz` package contains several scripts and tools that can be used to create a large dataset and also build tables to test the various parts of Hive.

After you have unzipped the package, edit the `validation-env.sh` file and set the values for the HS2 server. Based on your cluster size, you will need to uncomment/comment out the section used to control the size of the validation dataset. Below is a table that provides details regarding generated files based on cluster size:

|Cluster Size|NumberofRecords|NumberOfMappers|Approx Total Dataset Size|Notes About Generated Files|
|------------------|------------------------------------|----------------------|--------------------------------|-----------------------------------------|
| 5 | 100000000 | 5 | 1G | 5 files, each UNDER the block size |
 | 10 | 500000000 | 20 | 5G | 20 files, each just over the block size |
 | 10 | 1000000000 | 50 | 10G | 50 files, each over the block size |

***

##### 5.1 Data Generation and Global Function Testing
After you have downloaded all of the files, the script below should be run. Be sure to run the script below as the “hdfs” user to create hdfs directories that will be used to store shared libraries:

`./0-run-as-hdfs.sh`

Next, run the script that will copy a jar file with custom UDFs for Hive to the cluster. It will then register those functions to run some tests to prove that the function is globally available permanently.
The second part of the script will generate the dataset that will be used to test Hive at some scale.
The process below should be run as the “hive” user to minimize user setup and permission issues:

>Change to directory where the above package expanded to.

`./1-validation-setup.sh > / tmp /step-1.txt`

***

#### 6. Hive Checklist Items
There are multiple items that should be checked to ensure that Hive is configured properly. The table below provides the key areas of focus, along with the rationale behind them:


| Verify                                                                                                    | Notes/Rationale                                                                                                                                                                                                                               |
|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The Hive Metastore and HiveServer2 daemons are set up with at least 4 GB of memory                        | The Hive heap size by default is set to 1024. For clusters beyond a simple POC, this is not usually enough. For additional information, please refer to section of this lesson section titled, “Hive Metatstore and HS2 Validation.”          |
| The HiveServer2 is running in embedded metastore mode                                                     | Check with netstat if the process is making a call to 9083. For additional information, please refer to the section of this lesson title, “Verifying HiveServer 2 is Running in Embedded Metastore Mode.”                                     |
| All Hive clients/edge nodes can connect via remote metastore                                              | On each Hive client, run:hive –e ‘show databases;The result should yield at least the ‘default’ database on a new cluster.                                                                                                                    |
| You have created a partition table, loaded data, and run a query that kicks off MR/Tez jobs from Hive CLI | Use Beeline to test HS2 functionality. Review /tmp/step-2.txt to confirm after running the 2-hive-test.sh script.                                                                                                                             |
| You have run a map join query in the Hive Client and Beeline                                              |                                                                                                                                                                                                                                               |
| The ODBC/JDBC connections and query are validated, especially in kerberized cluster                       |                                                                                                                                                                                                                                               |
| You can perform “DDL” and “DML” queries with CLI and Beeline                                              | Review /tmp/step-2.txt to confirm after running the 2-hive-test.sh script. The scripts should create and drop a table via Hive CLI and Beeline.                                                                                               |
| You can perform “DDL” and “DML” queries in both execution engines (MapReduce and Tez)                     | Review /tmp/step-2.txt to confirm after running the 2-hive-test.sh script. The scripts should create and drop a table via “mr” and “tez.”                                                                                                     |
| You are able to create an ORC table and run queries                                                       | Show “Create Table” for the ORC table and look for ORC formats. Print the header, index, etc. from one of the ORC files. For additional information, refer to the section of this lesson titled, “Verifying the Ability to Create ORC Files.” |
| That statistics are automatically gathered                                                                | The last two queries run in “build-ptn-tbl.sql” while running with Tez should return in under 1-2 seconds.                                                                                                                                    |
| Compression                                                                                               |                                                                                                                                                                                                                                               |
| That unsupported configuration, CDH, and MapR jars are not present in the cluster                         |                                                                                                                                                                                                                                               |
| Queries can run concurrently in different queues                                                          |                                                                                                                                                                                                                                               |
| That partitioned data is at least 128 MB                                                                  |                                                                                                                                                                                                                                               |


***

#### 7. Testing Performance of the Hive Server

To test performance of the Hive Server, run the queries below:

To get a list of values that you can run targeted queries with, from either Beeline or Hive CLI, run the following and select 20 items from the list as testing parameters:

{% highlight css %}
-- Use this query to locate a distinct search value for testing.
-- The generated data will start with any of these characters
--    ABDEF12345
-- The eligible partitions will be by day in Feb of 2013.
select 
    distinct nm 
from 
    validation_partition_table 
where 
    my_part >= '2013-02-10' and my_part <= '2014-02-20' 
    and 'D' = substr(nm,1,1);

{% endhighlight %}

***

The query below should be run to perform an assortment of performance tests. The partition, “my_part” is valid between ‘2013-02-01’ and ‘2013-02-28’. Be sure to use the 20 items you selected from the above script as replacements for your query:

{% highlight css %}
-- tez or mr
set hive.execution.engine=${EXEC_ENGINE};
-- default or alt
set set tez.queue.name=${QUEUE_NAME};
 
select 
    start_dtm, nm, some_int 
from 
    validation_partition_table 
where 
    my_part >='${from}' and my_part <= '${to}'
    and nm = '${nm}';

{% endhighlight %}

The query should be run with the following combinations:
- Default queue with execution engine of ‘mr’
- Default queue with execution engine of ‘tez’
- Alt queue with execution engine of ‘mr’
- Alt queue with execution engine of ‘tez’

***

Finally, be sure to look for the following items while testing the performance of the Hive server:

- Look for warmed Application Masters. With “hive.execution.engine=tez”, queries after the first should be significantly faster (10 seconds faster) because the Application Master is being reused.

- Review the Application Masters in the Resource Manager and check that the queries are attaching to the ‘alt’ queue when specified.

***

#### 8. Verifying the Ability to Create ORC Files

As part of your validation testing, you should verify that ability to create ORC files. To do this, run the command below:

{% highlight css %}
beeline -u jdbc:hive2://<host>:<port> -n $USER -e 'use hdp_validation' \
    -e 'show table create validation_partition_table' -e 'show partitions validation_partition_table'
hive --service orcfiledump hdfs:///tmp/validation_partition_table_orc/my_part=2013-02-04/000000_0
{% endhighlight %}

***

**Reference - www.hortonworks.com**
