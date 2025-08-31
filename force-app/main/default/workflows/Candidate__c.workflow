<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>mod_name</fullName>
        <field>Name</field>
        <name>mod_name</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <rules>
        <fullName>test_workflow</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Candidate__c.Nbr_Jours_Annuel__c</field>
            <operation>lessThan</operation>
            <value>400</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
