# Vanilla API App

<h2>Concepts</h2>
<p>This application lets you manage random tasks.</p>
<p><dfn>Random tasks</dfn> are tasks that you want to get done with an approximate
frequency, but you don't mind the exact day. You want it to be a surprise for you,
the recipient of the action or both.
</p>
<p>A <dfn>group</dfn> is a container for tasks. On any day, just a single task for each group will be scheduled.</p>
<P>The <dfn>Scheduler algorithm</dfn> works as follows:</p>
<ol>
    <li>If a 'rarely' task is randomly chosen, that task is scheduled.</li>
    <li>If a 'seldom' task is randomly chosen, that task is scheduled.</li>
    <li>If a 'often' task is randomly chosen, that task is scheduled.</li>
    <li>Otherwise, no task is scheduled.</li>
</ol>
<p>A <dfn>rarely</dfn> task is randomly scheduled once every 365 days.</p>
<p>A <dfn>seldom</dfn> task is randomly scheduled once every 30 days.</p>
<p>A <dfn>often</dfn> task is randomly scheduled once every 7 days.</p>
<p>When a task is scheduled, an email is sent to the logged in user.</p>
<h2>Missing features:</h2>
<ul>
<li>Login with Google, Github, Facebook, etc... or name/password.</li>
<li>Modify names of groups. Not just Group1, ...</li>
<li>Send Whatsup, Messages instead of email.</li>
<li>Specify custom email address (likely needed for Google login)</li>
<li>Specify more complex scheduling rules (i.e. just on weekends, weekdays, per task cadence, ...)</li>
<li>Fix todos in the code.</li>
</ul>.
