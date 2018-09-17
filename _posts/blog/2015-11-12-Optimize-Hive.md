---
layout: post
category: blog
title: "Optimize Hive queries for Hadoop"
excerpt: "Most common Hive performance optimization methods"
tags: [bigdata, hadoop, apache, hortonworks, hive, optimization]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

Hadoop clusters are not optimized for performance. Here we try to cover a few of the most common Hive performance optimization methods that you can apply to your queries.

***

#### Scale out worker nodes

Increasing the number of worker nodes in a cluster can leverage more mappers and reducers to be run in parallel. This could be done at the provision time or at the run time.

***

#### Enable Tez

Apache Tez is an alternative execution engine to the MapReduce engine:
Apache Tez provides a developer API and framework to write native YARN applications that bridge the spectrum of interactive and batch workloads. It allows those data access applications to work with petabytes of data over thousands nodes. The Apache Tez component library allows developers to create Hadoop applications that integrate natively with Apache Hadoop YARN and perform well within mixed workload clusters.

![HDP Reference]({{ site.url }}/downloads/H1H2Tez.png)

Tez is faster because:

+ Express, model and execute processing logic: Tez models data processing as a dataflow graph, with the graph vertices representing application logic and its edges representing movement of data. A rich data flow definition API allows users to intuitively express complex query logic. The API fits well with query plans produced by higher-level declarative applications like Apache Hive and Apache Pig.
http://hortonworks.com/blog/apache-tez-a-new-chapter-in-hadoop-data-processing/

+ Execute Directed Acyclic Graph (DAG) as a single job in the MapReduce engine, the DAG that is expressed requires each set of mappers to be followed by one set of reducers. This causes multiple MapReduce jobs to be spun off for each Hive query. Tez does not have such constraint and can process complex DAG as one job thus minimizing job startup overhead.

+ Avoids unnecessary writes: Due to multiple jobs being spun for the same Hive query in the MapReduce engine, the output of each job is written to HDFS for intermediate data. Since Tez minimizes number of jobs for each Hive query it is able to avoid unnecessary write.

+ Minimizes start-up delays: Tez is better able to minimize start-up delay by reducing the number of mappers it needs to start and also improving optimization throughout.

+ Reuses containers Whenever possible: Tez is able to reuse containers to ensure that latency due to starting up containers is reduced.Tez follows the traditional Hadoop model of dividing a job into individual tasks, all of which are run as processes via YARN, on the users’ behalf. This model comes with inherent costs for process startup and initialization, handling stragglers and allocating each container via the YARN resource manager.

+ Continuous optimization techniques: Traditionally optimization was done during compilation phase. However more information about the inputs is available that allow for better optimization during runtime. Tez uses continous optimization techniques that allows it to optimize the plan further into the runtime phase.

+ Optimize performance and resource management: YARN manages resources in a Hadoop cluster, based on cluster capacity and load. The Tez execution engine framework efficiently acquires resources from YARN and reuses every component in the pipeline such that no operation is duplicated unnecessarily.
http://hortonworks.com/blog/introducing-tez-sessions/

>Hive query Tez enabled

You can make any Hive query Tez enabled by prefixing the query with the setting below:

{% highlight css %}
set hive.execution.engine=tez;
{% endhighlight %}

***

#### Hive partitioning

I/O operation is the major performance bottleneck for running Hive queries.The performance can be improved if the amount of data that needs to be read can be reduced. By default, Hive queries scan entire Hive tables. This is great for queries like table scans, however for queries that only need to scan a small amount of data (e.g. queries with filtering), this creates unnecessary overhead. Hive partitioning allows Hive queries to access only the necessary amount of data in Hive tables.

Hive partitioning is implemented by reorganizing the raw data into new directories with each partition having its own directory - where the partition is defined by the user. 
The following diagram illustrates partitioning a Hive table by the column Year.A new directory is created for each year.

![Hive partitioning sample :]({{ site.url }}/downloads/Hive-partitioning_1.png)

Some partitioning considerations:

+ Do not under-partition - Partitioning on columns with only a few values can cause very few partitions. For example, partitioning on gender will only create two partitions to be created (male and female), thus only reduce the latency by a maximum of half.

+ Do not over-partition - On the other extreme, creating a partition on a column with a unique value (e.g. userid) will cause multiple partitions causing a lot of stress on the cluster namenode as it will have to handle the large amount of directories.

+ Avoid data skew - Choose your partitioning key wisely so that all partitions are even size. An example is partitioning on State may cause the number of records under California to be almost 30x that of Vermont due to the difference in population.

Once the partitioned table is created, you can either create: 
>Static partitioning

Static partitioning means that you have already sharded data in the appropriate directories and you can ask Hive partitions manually based on the directory location.

>Dynamic partitioning.

Dynamic partitioning means that you want Hive to create partitions automatically for you. Since we have already created the partitioning table from the staging table, all we need to do is insert data to the partitioned table.


To create a partition table, use the Partitioned By clause:

{% highlight css %}
CREATE TABLE lineitem_part
    (L_ORDERKEY INT, L_PARTKEY INT, L_SUPPKEY INT,L_LINENUMBER INT,
     L_QUANTITY DOUBLE, L_EXTENDEDPRICE DOUBLE, L_DISCOUNT DOUBLE,
     L_TAX DOUBLE, L_RETURNFLAG STRING, L_LINESTATUS STRING,
     L_SHIPDATE_PS STRING, L_COMMITDATE STRING, L_RECEIPTDATE        STRING, L_SHIPINSTRUCT STRING, L_SHIPMODE STRING,
     L_COMMENT STRING)
PARTITIONED BY(L_SHIPDATE STRING)
ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
STORED AS TEXTFILE;
{% endhighlight %}

Static partitioning:
{% highlight css %}
INSERT OVERWRITE TABLE lineitem_part
PARTITION (L_SHIPDATE = ‘5/23/1996 12:00:00 AM’)
SELECT * FROM lineitem 
WHERE lineitem.L_SHIPDATE = ‘5/23/1996 12:00:00 AM’
ALTER TABLE lineitem_part ADD PARTITION (L_SHIPDATE = ‘5/23/1996 12:00:00 AM’))
LOCATION ‘wasb://sampledata@ignitedemo.blob.core.windows.net/partitions/5_23_1996/'
{% endhighlight %}

Dynamic partitioning:
{% highlight css %}
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;
INSERT INTO TABLE lineitem_part
PARTITION (L_SHIPDATE)
SELECT L_ORDERKEY as L_ORDERKEY, L_PARTKEY as L_PARTKEY , 
     L_SUPPKEY as L_SUPPKEY, L_LINENUMBER as L_LINENUMBER,
     L_QUANTITY as L_QUANTITY, L_EXTENDEDPRICE as L_EXTENDEDPRICE,
     L_DISCOUNT as L_DISCOUNT, L_TAX as L_TAX, L_RETURNFLAG as       L_RETURNFLAG, L_LINESTATUS as L_LINESTATUS, L_SHIPDATE as       L_SHIPDATE_PS, L_COMMITDATE as L_COMMITDATE, L_RECEIPTDATE as   L_RECEIPTDATE, L_SHIPINSTRUCT as L_SHIPINSTRUCT, L_SHIPMODE as     L_SHIPMODE, L_COMMENT as L_COMMENT, L_SHIPDATE as L_SHIPDATE FROM lineitem;
{% endhighlight %}

https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-PartitionedTables

***

####Use the ORCFile format

Hive supports different file formats. For example:

+ Text: this is the default file format and works with most scenarios
+ Avro: works well for interoperability scenarios
+ ORC/Parquet: best suited for performance
ORC (Optimized Row Columnar) format is a highly efficient way to store Hive data.Compared to other formats, ORC has the following advantages:
    + support for complex types including DateTime and complex and semi-structured types
    + up to 70% compression
    + indexes every 10,000 rows which allow skipping rows
    + a significant drop in run-time execution

>To enable ORC format

First create a table with the clause Stored as ORC:

{% highlight css %}
CREATE TABLE lineitem_orc_part
    (L_ORDERKEY INT, L_PARTKEY INT,L_SUPPKEY INT, L_LINENUMBER INT,
     L_QUANTITY DOUBLE, L_EXTENDEDPRICE DOUBLE, L_DISCOUNT DOUBLE,
     L_TAX DOUBLE, L_RETURNFLAG STRING, L_LINESTATUS STRING,
     L_SHIPDATE_PS STRING, L_COMMITDATE STRING, L_RECEIPTDATE STRING,
     L_SHIPINSTRUCT STRING, L_SHIPMODE STRING, L_COMMENT     STRING)
PARTITIONED BY(L_SHIPDATE STRING)
STORED AS ORC;
{% endhighlight %}

Next, you insert data to the ORC table from the staging table. For example:

{% highlight css %}
INSERT INTO TABLE lineitem_orc
SELECT L_ORDERKEY as L_ORDERKEY, 
       L_PARTKEY as L_PARTKEY , 
       L_SUPPKEY as L_SUPPKEY,
       L_LINENUMBER as L_LINENUMBER,
       L_QUANTITY as L_QUANTITY, 
       L_EXTENDEDPRICE as L_EXTENDEDPRICE,
       L_DISCOUNT as L_DISCOUNT,
       L_TAX as L_TAX,
       L_RETURNFLAG as L_RETURNFLAG,
       L_LINESTATUS as L_LINESTATUS,
       L_SHIPDATE as L_SHIPDATE,
       L_COMMITDATE as L_COMMITDATE,
       L_RECEIPTDATE as L_RECEIPTDATE, 
       L_SHIPINSTRUCT as L_SHIPINSTRUCT,
       L_SHIPMODE as L_SHIPMODE,
       L_COMMENT as L_COMMENT
FROM lineitem;
{% endhighlight %}

More on ORC - https://cwiki.apache.org/confluence/display/Hive/LanguageManual+ORC

***

####Vectorization

Vectorized query execution is a Hive feature that greatly reduces the CPU usage for typical query operations like scans, filters, aggregates, and joins.
Vectorization allows Hive to process a batch of 1024 rows together instead of processing one row at a time. This means that simple operations are done faster because less internal code needs to run.

To enable vectorization prefix your Hive query with the following setting:

{% highlight css %}
set hive.vectorized.execution.enabled = true;
{% endhighlight %}

More info - https://cwiki.apache.org/confluence/display/Hive/Vectorized+Query+Execution

***

#### Other optimization methods
There are more optimization methods, for example:

+ Hive bucketing: a technique that allows to cluster or segment large sets of data to optimize query performance.

+ Join optimization: optimization of Hive's query execution planning to improve the efficiency of joins and reduce the need for user hints. 
https://cwiki.apache.org/confluence/display/Hive/LanguageManual+JoinOptimization#LanguageManualJoinOptimization-JoinOptimization.

+ Increase Reducers

***

References - 
**http://hortonworks.com/hadoop/tez/**
**https://azure.microsoft.com/en-in/documentation/services/hdinsight/**