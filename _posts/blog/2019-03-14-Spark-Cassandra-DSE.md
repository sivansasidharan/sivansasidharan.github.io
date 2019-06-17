---


---

<h1 id="spark-cassandra-reference-guide">Spark Cassandra Reference Guide </h1>
<h3 id="resources">Resources</h3>
<p>By default, spark will launch new jobs using all cluster resources.  It’s often a best practice to reduce the default configuration of the number of core and memory used to avoid having a long running job (spark shell or sql) stealing all resources.<br>
Finding the best amount of memory and cores for a job isn’t always easy. The following can help define a good default value.</p>
<ul>
<li>Having many core will likely speed-up the computation. Start with spark.cores.max = 3-4 x number executor</li>
<li>Having more memory will allow bigger partition. 4-8GB is a good start (see details below).</li>
<li>The executor memory is split between all its core. Having 1 executor running 4 cores on a 1GB heap is likely wrong.</li>
<li>It’s generally best to define a number of core being a multiple of your number of executor</li>
<li>The number of core per executor is computed by totalNumberOfCore / numberOfExecutor</li>
<li><a href="https://github.com/groupon/sparklint">Sparklint</a>  can be useful to optimize cluster utilization</li>
</ul>
<h3 id="running-multiple-spark-application-dynamic-resource-allocation">Running multiple spark application: dynamic resource allocation</h3>
<p>Dynamic allocation can be used to allow a spark job to dynamically extends its resources (request more executors). see <a href="https://spark.apache.org/docs/latest/job-scheduling.html#configuration-and-setup">Spark documentation detail</a> (typically a long running job with small periodic jobs)</p>
<h3 id="running-jobs-within-a-single-spark-application-fair-scheduler">Running jobs within a single spark application: fair scheduler</h3>
<p>By default, spark will execute jobs in a FIFO order.  If multiple jobs need to be running at the same time, the fair scheduler can be used to run multiple jobs in parallel (multiple pools can be defined, each pools can be FIFO or FAIR).<br>
see <a href="https://spark.apache.org/docs/latest/job-scheduling.html#configuration-and-setup">Spark documentation detail</a></p>
<h2 id="running-your-job">Running your job</h2>
<h3 id="how-to-submit">How to submit</h3>
<p>There are multiple ways to submit a spark job with DSE:</p>
<ul>
<li>from a cluster node, using dse submit</li>
<li>Spark http api (not supported, not working in DSE &gt; 5.1. <a href="https://gist.github.com/arturmkrtchyan/5d8559b2911ac951d34a">https://gist.github.com/arturmkrtchyan/5d8559b2911ac951d34a</a>)</li>
<li>Spark jobserver (not HA)</li>
</ul>
<p>It’s easier to submit jars to DSEFS, especially when running on cluster mode.</p>
<pre><code>
    //send jar to dsefs. DSEFS HTTP api can also be used.
    dse fs "put /home/ss/testspark-0.0.1-SNAPSHOT.jar /testspark-0.0.1-SNAPSHOT.jar"
    //start job
    dse spark-submit --class TestSpark --files /home/ss/logback-spark-test.xml --conf "spark.driver.extraJavaOptions=-Dlogback.configurationFile=logback-spark-test.xml" --conf "spark.executor.extraJavaOptions=-Dlogback.configurationFile=logback-spark-test.xml" --deploy-mode cluster dsefs://localhost:5598/testspark-0.0.1-SNAPSHOT.jar
    
</code></pre>
<h3 id="monitoring-apis">Monitoring apis</h3>
<ul>
<li>Master URL: <a href="http://masterUI:7080">http://masterUI:7080</a></li>
<li>Standard api: <a href="https://spark.apache.org/docs/latest/monitoring.html">https://spark.apache.org/docs/latest/monitoring.html</a></li>
</ul>
<h2 id="memory--partition-size">Memory &amp; partition size</h2>
<h3 id="memory">Memory</h3>
<p>By default, spark starts its executors with 1GB of memory. That’s also what you get when you start a spark shell of a sparkSQL with dse sql.<br>
Over those 1GB, 300MB are allocated to spark.<br>
Over the 700MB remaining (1GB-300MB), 60% (by default) are reserved to spark execution (execution and persisted data).<br>
That left roughly 300MB of memory for user. If you use more than this amount of memory in 1 spark partition (task), you’ll get an OOM exception.<br>
<a href="http://blog.cloudera.com/blog/2015/03/how-to-tune-your-apache-spark-jobs-part-2/">Cloudera “How-to: Tune Your Apache Spark Jobs”</a></p>
<h3 id="partition-number">Partition number</h3>
<h4 id="understanding-spark-partitioning">Understanding spark partitioning</h4>
<p><a href="https://techmagie.wordpress.com/2015/12/19/understanding-spark-partitioning/">Make sure you read this blog post on Spark Partitioning</a></p>
<h4 id="dataframe">Dataframe</h4>
<p>The following <strong>global</strong> parameter configures the number of partitions that are used when a shuffle is performed over sparkSQL/Dataframe (joins, aggregations…).<br>
In addition, spark nows includes a .repartition() method that can be used if necessary.</p>
<pre><code>
    spark.sql.shuffle.partitions
    
</code></pre>
<p>This setting can’t be changed for a specific operation. Spark will use (max(spark.sql.shuffle.partitions, actualDataframePartitionNumber)) partitions during its join operations.<br>
If you know that your operation will require a lot of partitions, repartition your DF before or use smaller cassandra split size.</p>
<h4 id="rdd">RDD</h4>
<p>The same parameter is available for RDDs on operations like join, reduceByKey, and parallelize (when not set explicitly by the user).</p>
<pre><code>
    spark.default.parallelism
    
</code></pre>
<h4 id="how-many-partitions">How many partitions?</h4>
<p>The number of partition is generally driven by the data size. As a good default, try to aim for a partition size of 128MB (128MB = how many data is handled by a partition in memory).<br>
<strong>Most of the jobs use from 200 to 2000 partition.</strong><br>
When tuning the number of partitions, consider the following objectives:</p>
<ul>
<li>Avoid OOM</li>
<li>Avoid GC saturation (the webui show you the GC time of each task)</li>
<li>Avoid spilling to disk</li>
<li>Avoid many small operations</li>
</ul>
<p>Few partitions will result to no/bad parallelism, too many add overhead.<br>
Here is a formula to get a rough idea of the ideal number of partition.<br>
<em>size.of.stage</em> can be find by saving the data and checking its size in the web-ui.</p>
<pre><code>
    //If data is being cached:
    memory.available.per.task = (spark.executor.memory - overhead) x spark.memory.fraction x (1 - spark.memory.storageFraction) / spark.executor.cores
    partition.number = size.of.stage / memory.available.per.task
                     = size.of.stage / ((spark.executor.memory - overhead) x spark.memory.fraction x (1 - spark.memory.storageFraction) / spark.executor.cores)
                     = size.of.stage / ((spark.executor.memory - 300) x 0.6 x (1 - 0.5) / spark.executor.cores)
                     = size.of.stage / ((spark.executor.memory - 300) x 0.3 / spark.executor.cores)
    //If no data is being cached, spark.memory.storageFraction = 0, so in this case:
    partition.number = size.of.stage / ((spark.executor.memory - 300) x 0.6 / spark.executor.cores)
    
</code></pre>
<p>Another approximation for the <em>size.of.stage</em> could be the following : shuffle write * Shuffle spill (memory) / Shuffle spill (disk).  Shuffle write can be find in the stage detail.</p>
<p>FYI: Shuffle spill (memory) is the size of the deserialized form of the data in memory at the time when we spill it, whereas shuffle spill (disk) is the size of the serialized form of the data on disk after we spill it</p>
<p>Skew data is painful and are likely to create big partitions. Salt technique are generally use to mitigate this issue.<br>
<a href="https://dzone.com/articles/why-your-spark-apps-are-slow-or-failing-part-ii-da">https://dzone.com/articles/why-your-spark-apps-are-slow-or-failing-part-ii-da</a></p>
<p>Note that Spark handles partitions differently when there is more than 2000 partition. If your partition number is close to this number, try to increase it to more than 2000.</p>
<p>The previous formula is quite theoretical and isn’t always required. The following strategy can be used instead:</p>
<ul>
<li>Start with “decent” default executor memory (4-8g)</li>
<li>having OOM or lot of GC time, data is spilling to disk ? =&gt;
<ul>
<li>Increase memory</li>
<li>Increase number of partition</li>
<li>Reduce C* split size (spark.cassandra.input.split.size_in_mb, see below)</li>
</ul>
</li>
<li>Repeat</li>
</ul>
<p><a href="http://shop.oreilly.com/product/0636920046967.do">Spark perf tuning</a> from Holden Karau and Rachel Warren is a good reference.</p>
<h3 id="cassandra-split-size">Cassandra split size</h3>
<p>While reading Cassandra table, the connector will try to split the data by spark partition off a given size.<br>
1 spark partition contains N Cassandra partitions. however 1 Cassandra partition will always be loaded in a unique spark partition.<br>
Spark partition size are controlled by the following parameter:</p>
<pre><code>
    spark.cassandra.input.split.size_in_mb = 128
    
</code></pre>
<p>Note: DSE 5.1 increase this value to 512mb by default for you.</p>
<p>Keep in mind that this setting is just an estimate based on Cassandra table size estimation. To have a better idea of your partition size, check the in/out parameter of each task in the spark webui.<br>
If your spark application is running out of memory, increase spark executor heap and/or lower the original split size/<br>
This value define the partition size when reading data from Cassandra only, it doesn’t apply for joins operation.</p>
<h3 id="repartition">Repartition</h3>
<p>Repartition is generally used to increase the number of partition of your RDD or Dataframe. It’s an expensive operation since it will require to shuffle all data.<br>
Avoid unless necessary. It’s generally a better practice to lower the original partition size.<br>
It’s generally best to repartition to a number being a multiple of your total number of core.</p>
<h3 id="coaelesce">Coaelesce</h3>
<p>Coaelesce reduce the number of partition in a RDD or Dataframe. Unless the shuffle flag is set to true, it’s a simple operation, partitions will just be merged on each executors.</p>
<h2 id="rdd-vs-dataframe">RDD vs DataFrame</h2>
<p>Dataframes use Catalyst, a query optimizer with code generations.  Spark analyse your operations and builds a tree containing all your steps, generating code on the fly. It also allows spark to be smart and re-order operations if needed (filter will be applied before joins etc.)  RDD are a lower level of abstraction and should be used only when Dataframe can’t be used, or in specific case like joins. Switching from one to another has a cost. It’ll change serialization from tungsten to RDD, and also break spark Dataframe lineage, preventing potential optimization.</p>
<h3 id="serialization">Serialization</h3>
<p>Java Objects consume a lot of memory. Typically, a String will use:</p>
<ul>
<li>8(mark word) + 4(klass pointer) = 12 bytes for the header</li>
<li>8 bytes for the hashCode</li>
<li>8 bytes for the char[] array reference</li>
<li>4 bytes for the char[] array lenght</li>
<li>and finally 2 bytes per char in the string</li>
</ul>
<h4 id="dataframe-1">Dataframe</h4>
<p>To solve this issue, Dataframes use Tungsten, a serialization engine designed to store binary data. It allows byte-level comparison, preventing costly object creation. All operations manipulating columns will beneficiate from Tungsten. Transformation/Closure operations (.map(…), .filter(row =&gt; …) etc.) will trigger an expensive Ser/Deser step.</p>
<h4 id="typed-dataset">Typed Dataset</h4>
<p>Since spark 2.0, default builtin codec are available for case classes, making the use of Dataset (typed api) easier.<br>
However, this api will have to serialize/deserialize Java object, loosing Dataframe ability to mutate column in a very efficient way. Custom encoders can be built to provide serialization for non-supported type.</p>
<pre><code>
        spark.createDataFrame(purchases, new StructType()
          .add(StructField("id", StringType, true))
          .add(StructField("val1", DoubleType, true))
          .add(StructField("val2", DoubleType, true)))
    
</code></pre>
<h2 id="cassandra-read--write-throughput---data-locality">Cassandra Read &amp; Write throughput - data locality</h2>
<h3 id="general-recommendations">General recommendations</h3>
<p>Here are a few advise to make sure you control your Read/Write throughput. Note that the default settings are usually good:</p>
<ul>
<li>A custom connection factory (connection.factory=com.MyClass) can be used to increase the max number of connection and the query pool size</li>
<li>Parameters like output.batch.grouping.buffer.size, output.batch.size.bytes, output.concurrent.writes can be tuned to increase the throughput, but the default values are usually good.</li>
<li>The spark cassandra connector will try to group data per partition to increase write efficiency. A saveToCassandra operation will likely be faster on an ordered RDD. Do not order your data just for that reason.</li>
<li>Unless it’s a free operation, it’s generally best not to focus too much on data locality.</li>
<li>Spark will very likely hammer your cluster while reading/joining from a Cassandra table. In some cases, it can be worth limiting the maximum throughput of the connector for a specific operation. use input.reads_per_sec (with continuous paging only) or output.throughput_mb_per_sec.</li>
</ul>
<h3 id="full-table-scan---rdd-mapper-dataset-or-dataframe">Full table scan - RDD, mapper, Dataset or Dataframe?</h3>
<h4 id="dse-continuous-paging">DSE continuous paging</h4>
<p>Continuous paging allows DSE server to continue to fetch data while spark is processing a page. See <a href="https://www.datastax.com/dev/blog/dse-continuous-paging-tuning-and-support-guide">DSE blog post for more information</a> It generally boosts cassandra read time and can be enabled with the following option:</p>
<pre><code>spark.dse.continuous_paging_enabled=true
</code></pre>
<h4 id="full-table-scan-with-rdd-and-mapper">Full table scan with RDD and mapper:</h4>
<p>Cassandra connector provide a mapper allowing to automatically mount row to scala case classes. It’s handy but comes at a cost and will add pressure on the gc. It might be preferable not to use the mapper on the hot path.</p>
<pre><code>
    spark.sparkContext.cassandraTable[Purchase](DataLoader.Model.ks, table).map(..).count()
    
</code></pre>
<h4 id="full-table-scan-with-rdd">Full table scan with RDD:</h4>
<pre><code>
    spark.sparkContext.cassandraTable(DataLoader.Model.ks, table).map(..).count()
    
</code></pre>
<h4 id="full-table-scan-with-dataset">Full table scan with Dataset:</h4>
<pre><code>
    spark.read.cassandraFormat(table, DataLoader.Model.ks).load().as[Purchase].map(..).count()
    
</code></pre>
<h4 id="full-table-scan-with-dataframe">Full table scan with Dataframe:</h4>
<pre><code>
    spark.read.cassandraFormat(table, DataLoader.Model.ks).load().map(..).count()
    
</code></pre>
<p>Continuous paging clearly speeds up full scan. Make sure you  <a href="https://www.datastax.com/dev/blog/dse-continuous-paging-tuning-and-support-guide">read this post before enabling it</a>.</p>
<p>RDD and DF are similar especially since we use a .map() operation (we just want to compare C* read time, not DF operation)</p>
<p>The mapper comes at a cost and should be used wisely.</p>
<h2 id="pushdown-filters">Pushdown filters</h2>
<p>Spark can push down filters to the source. If you perform a filter on a partition key, clustering column or token range, it can be pushed-down to Cassandra. explain() can give you an idea of what’s going on, but if you want to be sure a predicat is effectively pushed-down to cassandra, change the following log level:</p>
<pre><code>
        Logger.getLogger("org.apache.spark.sql.cassandra").setLevel(Level.DEBUG)
    
</code></pre>
<p>Search request can also be pushed down to DSE. Search predicate allow instant count(*) operation, and are fast for queries retrieving a very small amount of data (&lt;2-3%). It’s usually faster to scan all the table after this limit.<br>
Enable search push-down the following parameter:</p>
<pre><code>
        //Globally: spark.sql.dse.solr.enable_optimization=true
        //Or locally per read
        val solrEnabledDataSet = spark.read
            .format("org.apache.spark.sql.cassandra")
            .options(Map(
            "keyspace" -&gt; "ks",
            "table" -&gt; "tab",
            "spark.sql.dse.solr.enable_optimization" -&gt; "true")
            .load()
    
</code></pre>
<p>Enable debug to make sure the filter is applied:</p>
<pre><code>
        Logger.getLogger("org.apache.spark.sql.SolrPredicateRules").setLevel(Level.DEBUG)
    
</code></pre>
<p><a href="https://docs.datastax.com/en/dse/5.1/dse-dev/datastax_enterprise/analytics/dseSearchAnalyticsOverview.html">Datastax search analytics integration</a></p>
<h2 id="shuffle">Shuffle</h2>
<p>Shuffle are expensive. Dataframe will try to optimize your lineage to ensure operations like reduces or filters are executed before the shuffle to reduce the amount of data.<br>
When working with RDDs, it’s up to you to make those kind of optimization.  This also includes reduce operations (if your final operation is to perform a reduce, always reduce before grouping).<br>
The number of object created during those operation shouldn’t be too high. Always prefer mutable structures or Array[] to object instantiation in the hot path.<br>
It’s easy to detect shuffle in spark webUI (each new stage in the DAG is usually caused by a shuffle).<br>
The DF and RDD .explain() or .toDebugString can also be used:</p>
<pre><code>
        #RDD Join with shuffle (search for CoGrouped operations)
        (5) MapPartitionsRDD[12] at join at BenchmarkJoins.scala:126 []
         |  MapPartitionsRDD[11] at join at BenchmarkJoins.scala:126 []
         |  CoGroupedRDD[10] at join at BenchmarkJoins.scala:126 []
         +-(5) MapPartitionsRDD[7] at keyBy at BenchmarkJoins.scala:124 []
         |  |  CassandraTableScanRDD[6] at RDD at CassandraRDD.scala:19 []
         +-(5) MapPartitionsRDD[9] at keyBy at BenchmarkJoins.scala:125 []
            |  CassandraTableScanRDD[8] at RDD at CassandraRDD.scala:19 []

        #RDD Join without shuffle (search for CoGrouped operations)
        (5) MapPartitionsRDD[29] at join at BenchmarkJoins.scala:107 []
         |  MapPartitionsRDD[28] at join at BenchmarkJoins.scala:107 []
         |  CoGroupedRDD[27] at join at BenchmarkJoins.scala:107 []
         |  CassandraTableScanRDD[22] at RDD at CassandraRDD.scala:19 []
         |  CassandraTableScanRDD[26] at RDD at CassandraRDD.scala:19 []

        #Dataframe join
        == Physical Plan ==
        *BroadcastHashJoin [_1#116.user_id], [_2#117.user_id], Inner, BuildRight
        :- *Project [named_struct(user_id, user_id#103L, firstname, firstname#104, lastname, lastname#105, shop_id, shop_id#106L, title, title#107, zipcode, zipcode#108) AS _1#116]
        :  +- *Scan org.apache.spark.sql.cassandra.CassandraSourceRelation@60c8909a [zipcode#108,shop_id#106L,title#107,user_id#103L,firstname#104,lastname#105] ReadSchema: struct&lt;_1:struct&lt;user_id:bigint,firstname:string,lastname:string,shop_id:bigint,title:string,zipc...
        +- BroadcastExchange HashedRelationBroadcastMode(List(input[0, struct&lt;user_id:bigint,purchase_id:bigint,item:string,price:int&gt;, false].user_id))
           +- *Project [named_struct(user_id, user_id#94L, purchase_id, purchase_id#95L, item, item#96, price, price#97) AS _2#117]
              +- *Scan org.apache.spark.sql.cassandra.CassandraSourceRelation@61503d00 [user_id#94L,purchase_id#95L,item#96,price#97] ReadSchema: struct&lt;_2:struct&lt;user_id:bigint,purchase_id:bigint,item:string,price:int&gt;&gt;

    
</code></pre>
<p>Avoid creating objects in the “hot path”, it will overload the GC. Prefer mutable object / Array.</p>
<h2 id="joins">Joins</h2>
<h3 id="joining-small-dataset">Joining small dataset</h3>
<h4 id="dataframe-2">Dataframe</h4>
<p>Spark usually pick a SortMergeJoin to perform joins. However, if the data being joined is small enough, it’ll use a broadcast join. By doing so it’ll first fetch the data and then send it once to each executor, saving unnecessary calls to Cassandra. The threshold is delimited by</p>
<pre><code>spark.sql.autoBroadcastJoinThreshold = 10M
</code></pre>
<pre><code>
      val shop = spark.read.cassandraFormat(DataLoader.Model.shopTable, DataLoader.Model.ks).load()
      val users = spark.read.cassandraFormat(userTable, DataLoader.Model.ks).load()
      //Force a broadcast join, will override conf threshold. Current limit to 2GB (block size, SPARK-6235)
      import org.apache.spark.sql.functions.broadcast
      val join = users.join(broadcast(shop), "shop_id")
    
</code></pre>
<h4 id="rdd-1">RDD</h4>
<p>The same logic can be applied to RDD. The small RDD must first be collected and then broadcasted:</p>
<pre><code>
      //Start by collecting the small RDD and broadcast it:
      val shops = spark.sparkContext.cassandraTable[Shop](DataLoader.Model.ks, shopTable).keyBy(s =&gt; s.shop_id).collect().toMap
      val broadcastShops = spark.sparkContext.broadcast(shops)
      val users = spark.sparkContext.cassandraTable[User](DataLoader.Model.ks, userTable)
      val join: RDD[(User, Shop)] = users.flatMap(user =&gt; {
        broadcastShops.value.get(user.shop_id).map {shop =&gt; (user, shop)}
      })
    
</code></pre>
<h3 id="normal-joins">Normal joins</h3>
<h4 id="rdd-joins">RDD joins</h4>
<p>Joins can be costly. If the 2 RDD being joined aren’t sharing the same partitioner, a shuffle will be require to distribute the key to the same partitions.  To prevent that, a common partitioner can be used. Partitioner aren’t preserved by any transformation operation.</p>
<p>To join 1 RDD with a non-cassandra RDD, the connector allows you to use .applyPartitionerFrom(otherRDD). All Partition Keys columns must also be present in the keys of the target RDD.</p>
<h4 id="join-with-a-cassandra-table">Join with a Cassandra table</h4>
<p>The RDD joinWithCassandra operation will trigger 1 query for each RDD row and won’t trigger shuffle.  DataFrame join will first perform 2 full table scan, and then perform a join on those 2 Dataframe, which is likely to be less efficient. Spark SQL performs the same way.  This has a very high cost especially when joins are executed against a small percentage of your table.  If you want to join 10 rows against a table having 1M entries, spark will start by reading 1M rows and then shuffle to only keep 10 rows.  Depending of the join cardinality, it’s generally faster to perform a Full Table Scan of the biggest table and then perform a join against the smaller table.<br>
The following snippets are different joins technique between Users and Purchases.<br>
In these examples, 1 user has 10 to 20 purchases, and we want to join users and purchases (RDD[User, Purchase] or RDD[User, Seq[Purchase]]).</p>
<h5 id="joinwithcassandratable">joinWithCassandraTable</h5>
<pre><code>
    spark.sparkContext.cassandraTable(DataLoader.Model.ks, userTable).joinWithCassandraTable(DataLoader.Model.ks, purchaseTable)
    
</code></pre>
<h5 id="joinwithcassandratable-with-mapper">joinWithCassandraTable with mapper</h5>
<pre><code>
    //mapper comes at a cost
    spark.sparkContext.cassandraTable[User](DataLoader.Model.ks, userTable).joinWithCassandraTable[Purchase](DataLoader.Model.ks, purchaseTable)
    
</code></pre>
<h5 id="rdd-join-keyby">RDD join keyBy</h5>
<pre><code>
    //Inefficient, will trigger a shuffle, don't do that.
    val purchases = spark.sparkContext.cassandraTable(DataLoader.Model.ks, purchaseTable).keyBy(p =&gt; p.user_id)
    val users = spark.sparkContext.cassandraTable(DataLoader.Model.ks, userTable).keyBy(u =&gt; u.user_id)
    users.join(purchases)
    
</code></pre>
<h5 id="rdd-join-keyby-same-partitioner">RDD join keyBy same partitioner</h5>
<pre><code>
    //2 Full table scans and then 1 join without shuffle. Requires an object (Tuple1), Usually less efficient.
      val purchases = spark.sparkContext.cassandraTable(DataLoader.Model.ks, purchaseTable).keyBy[Tuple1[Long]]("user_id")
      val users = spark.sparkContext.cassandraTable(DataLoader.Model.ks, userTable).keyBy[Tuple1[Long]]("user_id").applyPartitionerFrom(purchases)
      users.join(purchases)
    
</code></pre>
<h5 id="rdd-join-span-by-key">RDD join span by key</h5>
<pre><code>
    //Inefficient, will trigger a shuffle, don't do that.
      val purchases = spark.sparkContext.cassandraTable(DataLoader.Model.ks, purchaseTable).spanBy(p =&gt; p.user_id)
      val users = spark.sparkContext.cassandraTable(DataLoader.Model.ks, userTable).keyBy(u =&gt; u.user_id)
      val joinrdd = purchases.join(users)
    
</code></pre>
<h5 id="joinwithcassandratable-span-by-key">joinWithCassandraTable span by key</h5>
<pre><code>
      spark.sparkContext.cassandraTable(DataLoader.Model.ks, purchaseTable).spanBy(r =&gt; r.getLong("user_id")).joinWithCassandraTable(DataLoader.Model.ks, userTable)
    
</code></pre>
<h5 id="dataframe-joins">Dataframe joins</h5>
<pre><code>
    val purchases = spark.read.cassandraFormat(purchaseTable, DataLoader.Model.ks).load()
    val users = spark.read.cassandraFormat(userTable, DataLoader.Model.ks).load()
    val joinDF = users.join(purchases, purchases("user_id") === users("user_id"))
    
</code></pre>
<h5 id="dataset-joins">Dataset joins</h5>
<pre><code>
    val purchases = spark.read.cassandraFormat(purchaseTable, DataLoader.Model.ks).load().as[Purchase]
    val users = spark.read.cassandraFormat(userTable, DataLoader.Model.ks).load().as[User]
    val joinDS = users.join(purchases, purchases("user_id") === users("user_id"))
    
</code></pre>
<h2 id="dataframe-vs-sparksql">Dataframe vs SparkSQL</h2>
<p>SparkSQL is easy to read and will result in the same operation as standard Dataframe operation. UDF can also be registered to be accessible from a SparkSQL query.</p>
<pre><code>
    df.createOrReplaceTempView("myTable")
    spark.sqlContext.udf.register("strLen", (s: String) =&gt; s.length())

    
</code></pre>
<h2 id="cachepersist-vs-checkpoint">Cache/persist vs Checkpoint</h2>
<p>Use cache() to avoid re-computing your DAG twice when it forks and checkpoint() in long and complex jobs to avoid having to recompute all the lineage if a stage fails.</p>
<h2 id="consistency">Consistency</h2>
<p>Keep in mind that the default WRITE consistency level is LOCAL_QUORUM, but the default READ consistency consistency is LOCAL_ONE.  If you want to use a sparkSQL query to ensure a LOCAL_QUORUM update is successful, switch input.consistency.level to LOCAL_QUORUM while starting a dse sql sesssion.</p>
<h2 id="thrift-server">Thrift server</h2>
<p>DSE includes a thrift server, creating 1 spark context ready to execute SparkSQL queries. It’s easy to plug any SQL sources over your Cassandra tables using the ODBC or JDBC driver.  If your queries fail due to Out Of Memory errors, change the following settings:</p>
<ul>
<li>Select the minimum field required</li>
<li>Limit max data returned to the driver: spark.driver.maxResultSize=200m.<br>
The spark job/query will fail if more than 200m are returned to the driver (will happen for queries without limit).</li>
<li>Increase driver (thrift server) memory: --conf spark.driver.memory=2g.<br>
Should be &gt;&gt; spark.driver.maxResultSize. (1GB or 2GB is usually enough, could be more if a fair scheduler is used with multiple spark requests running in parallel)</li>
<li>Increase executor memory: --conf spark.executor.memory=4g. Should be at least 4GB. If multiple cores are used per executor, each task will roughly have (spark.executor.memory / numberOfCorePerExecutor / 2) RAM available for each spark partition.</li>
<li>Make sure your number of cores is in phase with the memory assigned to each executor: --conf spark.cores.max=6.</li>
<li>Reduce spark partition size (of the first request): --conf spark.cassandra.input.split.size_in_mb=128</li>
<li>Ultimatly, incrementalCollect could be enabled: --conf spark.sql.thriftServer.incrementalCollect=true. Could have performances penalty, avoid if possible</li>
</ul>
<pre><code>
    dse spark-sql-thriftserver start --conf spark.driver.memory=2g --conf spark.cores.max=6 --conf spark.executor.memory=5g --conf spark.cassandra.input.split.size_in_mb=128 --conf spark.driver.maxResultSize=200m --conf spark.sql.thriftServer.incrementalCollect=false
    #test connection with beeline:
    dse beeline
    !connect jdbc:hive2://localhost:10001
    select count(*) from ks.mytable;
    
</code></pre>
<h2 id="extra-resources">Extra resources</h2>
<p>DSE Analytics<br>
<a href="https://docs.datastax.com/en/dse/6.0/dse-dev/datastax_enterprise/featuresDSE.html">https://docs.datastax.com/en/dse/6.0/dse-dev/datastax_enterprise/featuresDSE.html</a></p>
<p><a href="https://www.gitbook.com/book/umbertogriffo/apache-spark-best-practices-and-tuning/details">https://www.gitbook.com/book/umbertogriffo/apache-spark-best-practices-and-tuning/details</a></p>
<p><a href="http://jason4zhu.blogspot.fr/2015/06/roaming-through-spark-ui-and-tune-performance-upon-a-specific-use-case.html">Performance Tuning Spark</a>:</p>
<p><a href="http://www.russellspitzer.com/2017/02/27/Concurrency-In-Spark/">Concurrency In Spark</a></p>
<p><a href="https://www.datastax.com/dev/blog/spark-application-dependency-management">Datastax Spark Dependency Management </a></p>
<p><a href="http://www.russellspitzer.com/2017/05/19/Spark-Sql-Thriftserver/">Spark-Sql-Thriftserver</a></p>

