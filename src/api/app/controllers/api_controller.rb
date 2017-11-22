class ApiController < ApplicationController

  def list_counties
    @counties = School.select('county').group('county').all().pluck('county')
    json_response(@counties)
  end

  def list_schools
    @schools = School.left_outer_joins(:Fact)
    .where(school: {county: params[:county_id]})
    .select('data_school_facts.school_add_city,
             data_school_facts.school_enrollment,
             data_school_facts.grades_offered,
             data_school_facts.dropout_rate,data_school_facts.sat_math,
             data_school_facts.sat_reading,
             data_school_facts.sat_writing,
             school.school_name,
             school.latitude,
             school.longitude
            ')
            .distinct()
    # .distinct()
    json_response(@schools)
  end

  def visualization_1
    @fiscal_information = School.joins(:Fiscal, :Fact)
              .select('
                (local_revenue + state_revenue + other_revenue + fed_revenue) AS revenue,
                school.state_lea_id,
                school_name,
                sat_math,
                sat_reading,
                sat_writing
              ')
              .where.not(data_school_facts: { sat_math: nil })
              .where.not(data_school_facts: { sat_reading: nil })
              .where.not(data_school_facts: { sat_writing: nil })
              .order('revenue ASC')
              .all()
    json_response(@fiscal_information)
  end

  def visualization_2
    hash = { a: true, b: false, c: nil }
    json_response([[1,2,3,4], [1,2], hash])
  end

  def visualization_3
    hash = { a: true, b: false, c: nil }
    json_response([[1,2,3,4], [1,2], hash])
  end
end
