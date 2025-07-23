# ASIAKASVIRTAMALLINNUS

## WORK-IN-PROGRESS

This is the development repo of a mental healthcare station patient flow simulation web app.

Contact: alex.villa@hus.fi

## What is this simulation about?

This simulation acts like a discrete event model to simulate patient dynamics through a healthcare station, modeling the flow of patients through a mental healthcare station over time. It estimates how many patients enter and leave the queue, how treatment resources (staff) are utilized, and ultimately predicts how the patient queue evolves month by month.

## Simulation model logic

### 1. Core Purpose

Simulate and visualize:

The change in patient queue size over time

The load on each treatment unit

The inflow and outflow of patients across different services

### 2. Input Parameters

From the global Redux state:

Timeframe: Duration of the simulation in months

Cycle duration: Basic unit of simulation (e.g., treatment duration)

Working hours, appointment durations, efficiency, and labor allocation

Initial queue size and new patients per month

Referral and re-referral rates between treatment steps

### 3. Treatment Steps and Patient Flow

Patients flow through the following treatment stages:

- Ensijäsennys (Initial assessment), which branches to:

  - Treatment-as-usual (TAU)

  - Stepped care, which branches to:

    - Step One

    - Step Two

  - Muu (Other services)

Each treatment step has:

A capacity (patients it can handle)

An insufficiency rate (patients needing further treatment)

A re-referral rate (back to queue or to other treatments)

### 4. Simulation Logic (What Happens Each Cycle)

a. Capacity Calculations
For each treatment step:

Calculate how many patients can be treated based on staff, working hours, appointment lengths, and efficiency.

Compare with demand (how many patients need the treatment).

Determine capacity utilization and whether resources are sufficient.

b. Patient Input Calculations
Determine, per treatment cycle:

How many patients enter each treatment

How many get referred to another treatment (based on insufficiency and referral rates)

How many return to the queue

c. Monthly Balance Calculations
Track for each month:

Inflow: new patients + those returning from other treatments

Outflow: patients entering treatment (i.e., leaving the queue)

d. Queue Size Update
Calculate queue size monthly:

### 5. Output

Returned by the thunk:

simulatedQueueArray: Queue size month-by-month

resultsTable: Debugging information on capacities, utilization, inputs

balanceIn: Patient inflows (joining/returning to the queue)

balanceOut: Patient outflows (leaving the queue for treatment)

This output is consumed by the UI to render simulation graphs and tables.

#### Developer notes:

ATTN: 08.04.2025 in package.json, manually downgraded @mui/material from ^7.0.1 to ^7.0.0. and @mui/system from ^7.0.1 to ^7.0.0 to resolve @mui/x-charts dependency conflict
"@mui/material": "^7.0.0",
"@mui/system": "^7.0.0",
