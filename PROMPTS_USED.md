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

Meeting: Marketing Sync
Date: 20-Feb-2026

Ronie: We need the campaign banner ready by next Monday.
Alice: I’ll design the banner.
Emma: I’ll prepare the social media captions by tomorrow.
Noah: I’ll review everything before publishing.


```

**3. Output**
- Task: Prepare the campaign banner | Owner: Alice | Due: 2026-02-23
- Task: Prepare social media captions | Owner: Emma | Due: 2026-02-21
- Task: Review all marketing materials | Owner: Noah | Due: Not specified
```