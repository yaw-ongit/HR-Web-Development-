  const hirings = [];
  for(let i=0; i<2; i++) {
    hirings.push({
      id: 'a3000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      candidate_id: candidates[i].id,
      job_vacancy_id: candidates[i].job_vacancy_id,
      offer_date: '2026-07-25',
      offered_job_grade_id: 'a0000000-0000-0000-0000-000000000001',
      offered_position_id: 'f0000000-0000-0000-0000-000000000022',
      offered_salary: 8000000,
      accepted: true,
      start_date: '2026-08-01'
    });
  }
  const { error: errHi } = await supabase.from('hirings').upsert(hirings);
  if (errHi) throw new Error('Hirings Err: ' + JSON.stringify(errHi));
  console.log('OK: inserted ' + hirings.length + ' rows into hirings');
