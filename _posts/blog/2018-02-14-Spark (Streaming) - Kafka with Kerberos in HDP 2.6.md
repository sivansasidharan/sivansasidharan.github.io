---
layout: post
category: blog
title: Spark (Streaming) - Kafka on Kerberized HDP
excerpt: Spark (Streaming) - Kafka on Kerberized HDP
tags: [bigdata, hadoop, apache spark, flink, hortonworks]
comments: true
---

<p>The common issues we probably encounter when doing debugging. The environment is HDP 2.6.1.0 with FreeIPA kerberized, Spark 1.6.3 and Kafka 0.10.1<br>
Refer to the test code from below link [–&gt; added lines enabling it running in kerberized.]<br>
<a href="https://github.com/eBay/Spark/blob/master/examples/src/main/java/org/apache/spark/examples/streaming/JavaDirectKafkaWordCount.java">JavaDirectKafkaWordCount</a></p>
<pre><code>package spark.example;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Arrays;
import java.util.regex.Pattern;
import scala.Tuple2;
import com.google.common.collect.Lists;
import kafka.serializer.StringDecoder;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.*;
import org.apache.spark.streaming.api.java.*;
import org.apache.spark.streaming.kafka.KafkaUtils;
import org.apache.spark.streaming.Durations;
public final class JavaDirectKafkaWordCount {
    private static final Pattern SPACE = Pattern.compile( " " );
    public static void main(String[] args) {
        // Create context with a 2 seconds batch interval
        SparkConf sparkConf = new SparkConf().setAppName("JavaDirectKafkaWordCount");
        JavaStreamingContext jssc = new JavaStreamingContext( sparkConf, Durations.seconds( 200 ) );
        HashSet&lt;String&gt; topicsSet = new HashSet&lt;String&gt;( Arrays.asList( "kerb" ) );
        HashMap&lt;String, String&gt; kafkaParams = new HashMap&lt;String,String&gt;();
        kafkaParams.put("bootstrap.servers", "local0.field.hortonworks.com:6667");
        kafkaParams.put("group.id", "test_sparkstreaming_kafka");
        kafkaParams.put("auto.offset.reset", "largest");
        kafkaParams.put("security.protocol", "PLAINTEXTSASL");
        System.setProperty("java.security.auth.login.config","/usr/hdp/current/kafka-broker/config/kafka_client_jaas.conf");
        System.setProperty("java.security.krb5.conf", "/etc/krb5.conf");
        // Create direct kafka stream with brokers and topics
        JavaPairInputDStream&lt;String, String&gt; messages = KafkaUtils.createDirectStream(
                jssc,
                String.class,
                String.class,
                StringDecoder.class,
                StringDecoder.class,
                kafkaParams,
                topicsSet
        );
        // Get the lines, split them into words, count the words and print
        JavaDStream&lt;String&gt; lines = messages.map( new Function&lt;Tuple2&lt;String, String&gt;, String&gt;() {
            @Override
            public String call(Tuple2&lt;String, String&gt; tuple2) {
                return tuple2._2();
            }
        } );
        JavaDStream&lt;String&gt; words = lines.flatMap( new FlatMapFunction&lt;String, String&gt;() {
            @Override
            public Iterable&lt;String&gt; call(String x) {
                return Lists.newArrayList( SPACE.split( x ) );
            }
        } );
        JavaPairDStream&lt;String, Integer&gt; wordCounts = words.mapToPair(
                new PairFunction&lt;String, String, Integer&gt;() {
                    @Override
                    public Tuple2&lt;String, Integer&gt; call(String s) {
                        return new Tuple2&lt;String, Integer&gt;( s, 1 );
                    }
                } ).reduceByKey(
                new Function2&lt;Integer, Integer, Integer&gt;() {
                    @Override
                    public Integer call(Integer i1, Integer i2) {
                        return i1 + i2;
                    }
                } );
        wordCounts.print();
        // Start the computation
        jssc.start();
        jssc.awaitTermination();
    }
} 
</code></pre>

<p>The jaas configuration file wraps the principal and its keytab path.<br>
Here we have directly used the kafka service account. Ideally you should build the user account for this.</p>
<pre><code>[root@local0 ~]# cat /usr/hdp/current/kafka-broker/config/kafka_client_jaas.confKafkaClient
KafkaClient {
com.sun.security.auth.module.Krb5LoginModule required
useKeyTab=true
doNotPrompt=true
principal="kafka/local0.field.hortonworks.com@test.hortonworks.com"
keyTab="kafka.service.keytab"
useTicketCache=true
renewTicket=true
serviceName="kafka";
};
Client {
com.sun.security.auth.module.Krb5LoginModule required
useKeyTab=true
doNotPrompt=true
principal="kafka/local0.field.hortonworks.com@test.hortonworks.com"
keyTab="kafka.service.keytab"
useTicketCache=true
renewTicket=true
serviceName="kafka";
}; 
</code></pre>
<p>Details on the submission command as below -</p>
<pre><code>//spark job for kerberized hdp 2.5
spark-submit --master=yarn --deploy-mode=cluster \
--files /usr/hdp/current/kafka-broker/config/kafka_client_jaas.conf,/etc/security/keytabs/kafka.service.keytab \
--conf "spark.executor.extraJavaOptions=-Djava.security.auth.login.config=kafka_client_jaas.conf" \
--conf "spark.driver.extraJavaOptions=-Djava.security.auth.login.config=kafka_client_jaas.conf" \
--conf "spark.yarn.historyServer.address=http://local0.field.hortonworks.com:18080"  \
--conf "spark.eventLog.dir=hdfs:///spark-history"  \
--conf "spark.eventLog.enabled=true" \
--jars /usr/hdp/current/spark-client/lib/spark-assembly-1.6.3.2.6.1.0-129-hadoop2.7.3.2.6.1.0-129.jar,/usr/hdp/current/kafka-broker/libs/kafka_2.10-0.10.1.2.6.1.0-129.jar,/usr/hdp/current/spark-client/lib/spark-examples-1.6.3.2.6.1.0-129-hadoop2.7.3.2.6.1.0-129.jar \
--class spark.example.JavaDirectKafkaWordCount kafka-producer-1.0-SNAPSHOT.jar
There is no need such in HDP 2.6
//spark job for kerberized hdp 2.6
spark-submit --master=yarn --deploy-mode=cluster \
--files /usr/hdp/current/kafka-broker/config/kafka_client_jaas.conf,/etc/security/keytabs/kafka.service.keytab \
--conf "spark.executor.extraJavaOptions=-Djava.security.auth.login.config=kafka_client_jaas.conf" \
--conf "spark.driver.extraJavaOptions=-Djava.security.auth.login.config=kafka_client_jaas.conf" \
--jars /usr/hdp/current/spark-client/lib/spark-assembly-1.6.3.2.6.1.0-129-hadoop2.7.3.2.6.1.0-129.jar,/usr/hdp/current/kafka-broker/libs/kafka_2.10-0.10.1.2.6.1.0-129.jar,/usr/hdp/current/spark-client/lib/spark-examples-1.6.3.2.6.1.0-129-hadoop2.7.3.2.6.1.0-129.jar \
--class spark.example.JavaDirectKafkaWordCount kafka-producer-1.0-SNAPSHOT.jar 
</code></pre>
<p>Details on the above code and command, refer  <a href="https://docs.hortonworks.com/HDPDocuments/HDP2/HDP-2.4.3/bk_spark-guide/content/spark-streaming-kafka-kerb.html">https://docs.hortonworks.com/HDPDocuments/HDP2/HDP-2.4.3/bk_spark-guide/content/spark-streaming-kafka-kerb.html</a></p>
<hr>
<ol>
<li><strong>Zookeeper access right check</strong></li>
</ol>
<p>Because Kafka need to read topics and offset information from zookeeper znode, check if the acl satisfies</p>
<pre><code>[root@local0 tmp]# cd /usr/hdp/current/zookeeper-client/bin
[root@local0 bin]# ./zkCli.sh -server local0:2181
[zk: local0:2181(CONNECTED) 0] getAcl /
'world,'anyone
: cdrwa
[zk: local0:2181(CONNECTED) 2] getAcl /consumers
'world,'anyone
: cdrwa
[zk: local0:2181(CONNECTED) 4] getAcl /brokers   
'world,'anyone
: cdrwa 
</code></pre>
<hr>
<ol start="2">
<li><strong>HDFS access right check</strong></li>
</ol>
<pre><code>[root@local0 ~]# hdfs dfs -ls /user
Found 10 items
drwxrwx--- - ambari-qa hdfs0 2017-09-17 13:34 /user/ambari-qa
drwxr-xr-x - hbase hdfs0 2017-08-20 00:08 /user/hbased
rwxr-xr-x - hcathdfs0 2017-08-06 00:55 /user/hcat
drwx------ - hdfshdfs0 2017-09-28 03:10 /user/hdfs
drwxr-xr-x - hivehdfs0 2017-08-06 00:55 /user/hive
drwxr-xr-x - kafka hdfs0 2017-09-28 12:23 /user/kafka
drwxrwxr-x - oozie hdfs0 2017-08-06 00:56 /user/oozie
drwxr-xr-x - hdfshdfs0 2017-08-13 11:47 /user/root
drwxrwxr-x - spark hdfs0 2017-09-08 16:54 /user/spark
drwxr-xr-x - yarnhdfs0 2017-09-16 22:17 /user/yarn 
</code></pre>
<p>Note by default there did not create path “/user/kafka”, so you need do it by hand and give right access</p>
<pre><code>[root@local0 ~]# hdfs dfs -mkdir /user/kafka
[root@local0 ~]# hdfs dfs -chown kafka:hdfs /user/kafka 
</code></pre>
<hr>
<ol start="3">
<li><strong>Jaas configuration file and Keytab file access right</strong></li>
</ol>
<p>Sparkstreaming job here is submitted in yarn cluster, which then plays as yarn user to read jaas and keytab files, should check the file acl. By default keytab file only its principal user to read, other users cannot access. You should grant other user to read those two files.</p>
<pre><code>[root@local0 ~]# ls -l /usr/hdp/current/kafka-broker/config/kafka_client_jaas.conf
-rw-r--r-- 1 kafka hadoop 560 Sep 26 13:35 /usr/hdp/current/kafka-broker/config/kafka_client_jaas.conf
[root@local0 ~]# ls -l /etc/security/keytabs/kafka.service.keytab
-r--r--r-- 1 kafka hadoop 208 Aug6 01:53 /etc/security/keytabs/kafka.service.keytab 
</code></pre>
<ol start="4">
<li><strong>Specify path of Jaas and Keytab files</strong></li>
</ol>
<p>As emphasized in most Spark articles, Sparkstreaming driver wrap Jaas and Keytab files and sent to executor to parse. The very important step is specify the path on the driver machine. There is no need to hand-copy those files to all slave nodes.</p>
<pre><code>--files /usr/hdp/current/kafka-broker/config/kafka_client_jaas.conf,/etc/security/keytabs/kafka.service.keytab \
--conf "spark.executor.extraJavaOptions=-Djava.security.auth.login.config=kafka_client_jaas.conf" \
--conf "spark.driver.extraJavaOptions=-Djava.security.auth.login.config=kafka_client_jaas.conf" \ 
</code></pre>
<p>If there's some configurations missed as detailed above , you will likely come across error(s) saying :<br>
<em>org.apache.spark.SparkException:  Couldn’t connect to leader for topic</em></p>
<p>or</p>
<p><em>javax.security.auth.login.LoginException:Unable to obtain password from user</em><br>
or</p>
<p><em>org.apache.kafka.common.KafkaException: org.apache.kafka.common.KafkaException:Jaas configuration not found</em></p>
<pre><code>[root@local0 tmp]# yarn application -list -appStates RUNNING
17/09/30 22:22:08 INFO client.RMProxy: Connecting to ResourceManager at local1.field.hortonworks.com/172.26.197.243:8050
17/09/30 22:22:09 INFO client.AHSProxy: Connecting to Application History server at local1.field.hortonworks.com/172.26.197.243:10200
Total number of applications (application-types: [] and states: [RUNNING]):3
                Application-Id    Application-Name    Application-Type      User     Queue             State       Final-State       Progress                       Tracking-URL
application_1505572583831_0056spark.example.JavaDirectKafkaWordCount               SPARK     kafka   default           RUNNING         UNDEFINED            10%        http://172.26.197.246:37394
</code></pre>
<ul>
<li><strong>Use Yarn resource manager and History server webpage to check log</strong></li>
</ul>
<p>Yarn resource manager helps you dive into containers’ logs since spark execute tasks distributed across contained executors. While History server enable you to check spark DAG and full stack printed on each executor, and the more is collecting metrics help to do problem analysis.</p>
<ul>
<li><strong>Maven: specify HDP repository and dependent jar for compiling purpose</strong></li>
</ul>
<p>Should align with HDP release package and have jar files searched from HDP official repository</p>
<pre><code>&lt;repositories&gt;
    &lt;repository&gt;
        &lt;releases&gt;
            &lt;enabled&gt;true&lt;/enabled&gt;
        &lt;/releases&gt;
        &lt;snapshots&gt;
            &lt;enabled&gt;true&lt;/enabled&gt;
        &lt;/snapshots&gt;
        &lt;id&gt;hortonworks.extrepo&lt;/id&gt;
        &lt;name&gt;Hortonworks HDP&lt;/name&gt;
        &lt;url&gt;http://repo.hortonworks.com/content/repositories/releases&lt;/url&gt;
    &lt;/repository&gt;
    &lt;repository&gt;
        &lt;releases&gt;
            &lt;enabled&gt;true&lt;/enabled&gt;
        &lt;/releases&gt;
        &lt;snapshots&gt;
            &lt;enabled&gt;true&lt;/enabled&gt;
        &lt;/snapshots&gt;
        &lt;id&gt;hortonworks.other&lt;/id&gt;
        &lt;name&gt;Hortonworks Other Dependencies&lt;/name&gt;
        &lt;url&gt;http://repo.hortonworks.com/content/groups/public&lt;/url&gt;
    &lt;/repository&gt;
&lt;/repositories&gt;&lt;br&gt;
</code></pre>
<p>For this test code, we have following dependent package</p>
<pre><code>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.apache.kafka&lt;/groupId&gt;
        &lt;artifactId&gt;kafka-clients&lt;/artifactId&gt;
        &lt;version&gt;0.11.0.0&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.apache.hadoop&lt;/groupId&gt;
        &lt;artifactId&gt;hadoop-hdfs&lt;/artifactId&gt;
        &lt;version&gt;2.7.3&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.apache.hadoop&lt;/groupId&gt;
        &lt;artifactId&gt;hadoop-common&lt;/artifactId&gt;
        &lt;version&gt;2.7.3&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.apache.spark&lt;/groupId&gt;
        &lt;artifactId&gt;spark-streaming-kafka_2.10&lt;/artifactId&gt;
        &lt;version&gt;1.6.3.2.6.1.0-129&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.apache.spark&lt;/groupId&gt;
        &lt;artifactId&gt;spark-streaming_2.10&lt;/artifactId&gt;
        &lt;version&gt;1.6.3.2.6.1.0-129&lt;/version&gt;
        &lt;scope&gt;provided&lt;/scope&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;&lt;br&gt;
</code></pre>
<p>Once compiled the target jar, only pick non-dependencies to execute, and specify path of dependent jars in command.</p>
<pre><code>--jars /usr/hdp/current/spark-client/lib/spark-assembly-1.6.3.2.6.1.0-129-hadoop2.7.3.2.6.1.0-129.jar,/usr/hdp/current/kafka-broker/libs/kafka_2.10-0.10.1.2.6.1.0-129.jar,/usr/hdp/current/spark-client/lib/spark-examples-1.6.3.2.6.1.0-129-hadoop2.7.3.2.6.1.0-129.jar \
--class spark.example.JavaDirectKafkaWordCount kafka-producer-1.0-SNAPSHOT.jar
</code></pre>
<p>**Use Kafka tool to test<br>
After starting the above streaming process, meanwhile initiate an producer using</p>
<pre><code>[root@local0 bin]# ./kafka-console-producer.sh --broker-list local0:6667 --topic kerb--security-protocol PLAINTEXTSASL
Test content..
</code></pre>
<p>Check the output log generated from SparkStreaming process, either from yarn or spark history server.</p>
<p>o/p #Time: 1506791200000 ms<br>
(Kafka,1) (2.6,1) (HDP,1) (Other,1) (,1) (Connecting,1) (Kerberized,1) (Notable,1) (Issue,1) (in,1) …</p>

