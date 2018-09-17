---
layout: post
category: blog
title: Performance tuning
excerpt: Performance tuning - SPSS Analytic Server
tags: [bigdata, hadoop, apache spark, SPSS, hortonworks,IBM]
comments: true
---

<p><strong>Performance tuning - SPSS Analytic Server</strong></p>
<p>Analytic Server is a component in the Ambari framework that utilizes other components such as HDFS, Yarn and Spark. Common performance tuning techniques for Hadoop, HDFS and Spark apply to Analytic Server workloads.</p>
<blockquote>
<p>Every Analytic Server workload is different therefore tuning<br>
experimentation is required based on your speciﬁc deployments workload</p>
</blockquote>
<p>The following properties and tuning tips are key changes that have impacted the results of the Analytic Server benchmarking and scaling tests.</p>
<p>When the ﬁrst job runs on Analytic Server, the server will start a persistent Spark application that will be active until the Analytic Server is shut down. The persistent Spark application will allocate and hold onto all the cluster resources allocated to it for the duration of the Analytic Server running, even if an Analytic Server job is not actively running. Careful thought should be given to the amount of resources allocated to the Analytic Server Spark application. If all cluster resources are allocated to the Analytic Server Spark application, then other jobs could be delayed or not run. These jobs could be queued waiting for sufﬁcient free<br>
resources and those resources will be consumed by Analytic Server Spark application.</p>
<p><code>If multiple Analytic Server services are conﬁgured and deployed, each service instance could potentially allocate its own persistent Spark application.</code></p>
<p>For example, if two Analytic Server services are deployed to support high availability failover, then you could see two persistent Spark applications active, each allocating cluster resources.</p>
<p>An additional complexity is that in certain situations, Analytic Server may start a map reduce job that will require cluster resources. These map reduce jobs will require resources that are not allocated to the Spark application. The speciﬁc components that require map reduce jobs are PSM model builds.</p>
<hr>
<p>The following properties can be conﬁgured to allocate resources to Spark application. If they are set in the <em>spark-defaults.conf</em> of the Spark installation, then they are allocated for all Spark jobs run in the environment. If they are set in the Analytic Server conﬁguration as custom poperties under the “<em>Custom analytic.cfg</em>” section, then they are allocated for the Analytic Server Spark application only.</p>
<pre><code>#spark.executor.memory
Amount of memory to use per executor process.
#spark.executor.instances
The number of executor processes to start
#spark.executor.cores - 
The number of executor worker threads per executor process.
</code></pre>
<p>An example of setting the three key Spark properties. There are 10 data nodes in a HDFS cluster and each data node has 24 logical cores and 48 GB of memory and is only running HDFS processes. Here is one way to conﬁgure the properties for this environment, assuming you are only running Analytic Server jobs on this environment and desire maximum allocation to a single Analytic Server Spark application.</p>
<ul>
<li>
<p>Set <strong>spark.executor.instances=20</strong><br>
This would attempt to run 2 Spark executor processes per data node.</p>
</li>
<li>
<p>Set <strong>spark.executor.memory=22G</strong><br>
This would set the max heap size for each Spark executor process to 22 GB, allocating 44 GB on each data node. Other JVMs and the OS need the extra memory.</p>
</li>
<li>
<p>Set <strong>spark.executor.cores=5</strong><br>
This will provide 5 worker threads for each Spark executor, for a total of 10 worker threads per data node.</p>
</li>
</ul>
<p><strong>Monitor the Spark UI for running jobs</strong></p>
<p>If you see Spill to disk that could impact performance.<br>
Some possible solutions are:</p>
<ol>
<li>
<p>Increase memory and allocate it to Spark executors via<br>
spark.executor.memory</p>
</li>
<li>
<p>Reduce the number of spark.executor.cores. This will reduce the number of concurrent work threads allocating memory, but it will also reduce the amount of parallelism for the jobs.</p>
</li>
<li>
<p>Change the Spark memory properties. <em>spark.shuffle.memoryFraction</em> and <em>spark.storage.memoryFraction</em> allocation percentage of the Spark executor heap for Spark.</p>
</li>
</ol>
<p><strong>Ensure the name node has enough memory</strong><br>
If the number of blocks in HDFS is large and growing, ensure you name node heap increases to accommodate this growth. This is a common HDFS tuning recommendation.</p>
<p><strong>Alter the amount of memory used for caching</strong><br>
By default, spark.storage.memoryFraction has value 0.6. This can be increased up to 0.8 in case the HDFS block size of the data is 64MB. If the HDFS block size of the input data is greater than 64MB then this value could be increased only if the memory allocated per task is greater than 2GB.</p>
<p><strong>Spark map-side join</strong><br>
The Analytic Server Spark join implementation does not support map-side join functionality (Spark join is mainly a reduce side). The implementation does not take advantage of map-side joins to optimize joins when one input is small. Not taking advantage of map-side join results in an extremely resource intensive Spark job that eventually fails.</p>
<hr>
<h5 id="references">References</h5>
<p><a href="https://spark.apache.org/">Apache Spark</a><br>
<a href="https://hortonworks.com/blog/">Hortonworks Blog</a><br>
<a href="https://ibm.com/in-en/marketplace/spss-analytic-server">IBM SPSS Analytic Server</a></p>

