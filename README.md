# ASIAKASVIRTAMALLINNUS / PATIENT FLOW SIMULATION

## WORK-IN-PROGRESS

This is the development repo of a mental healthcare unit patient flow simulation web app.

The app is built using React and Vite, React Redux for state management, with Material-UI and Base-UI components and d3.js for visualizations.

Contact: alex.villa@hus.fi

## What is this simulation about?

This simulation is a discrete event model that simulates patient flow dynamics through a healthcare station over time.

The model helps assess the current treatment backlog, resource situation and determine what kind of treatment pathways and resourcing are needed to address the queue. It provides valuable insights into process bottlenecks, under/over-utilized services, and queue growth or reduction, helping with capacity planning and policy decisions.

### How Patient Flow Modeling Can Be Used

- To respond to difficult situations and communicate leadership decisions openly and transparently

- For allocating resources effectively

- In planning for professional development needs

- To optimize referral and care pathway practices

### How the Model Works

The user can use the default parameters or input their own values, which the model uses to calculate outcomes.

The logic behind the model is based on the following principles:

There is a group of individuals seeking help, forming a queue for assessment and treatment.

During initial assessment (also called "Ensijäsennys"), patients are referred either to standard treatment or to a stepped care model.

After receiving care, patients may:

- No longer need further treatment (treatment was sufficient),

- Be referred to the next level of care (e.g., from guided self-help to short-term cognitive therapy), or

- Be escalated directly to a higher level of care or external service (e.g., to specialized care).

- Some patients return to the queue after completing treatment, seeking help again regardless of the completed treatment.

### The Model Includes Four Main Parts:

#### Queue, initial assessment, and resourcing

In this section, the user inputs model parameters:

- The current number of people waiting for treatment

- The average number of new patients joining the queue each month

- The percentages of patients directed to different care options (standard care, brief interventions, or external services like online therapy, specialized care, or social services)

- The number of trained professionals available for each treatment and how much of their working time is allocated to providing care

#### Impact of Resourcing:

This section auto-calculates results based on input. It shows how many patients are being referred to each treatment and whether the available resources match the demand.

- If more patients are being referred than can be treated, demand exceeds capacity.

- If on the other hand capacity meets or exceeds demand, all referred patients can enter treatment.

- The tool also shows by how much the capacity is over- or under-utilized.

#### Underlying Assumptions:

This section includes default values (but allows user editing) of assumptions such as:

- How many patients are expected to recover or need no further treatment

- To which level treatment is escalated if the initial treatment is not sufficient

- The average duration of each type of treatment (e.g., a single guided self-help case or short-term therapy session)

- How efficiently professionals can use their time for direct care

#### Simulation Output:

The model provides a simulation of the treatment queue over a time period (e.g. 12 months), in addition to numbers about the process dynamics:

- The queue graph: if the graph is rising instead of falling, it means the backlog isn’t decreasing and more queue is accumulating

- Resource constraints and bottlenecks (staff and appointment capacity and utilization rates)

#### Developer notes:

ATTN: 08.04.2025 in package.json, manually downgraded @mui/material from ^7.0.1 to ^7.0.0. and @mui/system from ^7.0.1 to ^7.0.0 to resolve @mui/x-charts dependency conflict
"@mui/material": "^7.0.0",
"@mui/system": "^7.0.0",
