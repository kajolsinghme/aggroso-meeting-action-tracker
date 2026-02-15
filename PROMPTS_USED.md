# Prompts Used

**1. Extract action items from meeting transcript**
Prompt:
```

You are an assistant that extracts action items from a meeting transcript.
Return a JSON array where each item has:

task (string)

owner (string, if any)

dueDate (ISO date (YYYY-MM-DD), if any)

Make sure to use the meeting date as reference.
```

**2. Sample Transcript**
```

Liam: I will finalize the security audit by next Tuesday.
Emma: Prepare the client presentation by Wednesday.
Noah: Update project documentation by Friday.

```

**3. Output**
- Task: Finalize security audit | Owner: Liam | Due: next Tuesday
- Task: Prepare the client presentation | Owner: Emma | Due: Wednesday
- Task: Update project documentation | Owner: Noah | Due: Friday
```