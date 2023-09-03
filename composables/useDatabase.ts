export const useDatabase = () => {
    const supabase: any = useSupabaseClient()
    
    async function getTable(tableName: string, orderColumn: string) {
        let tableSize: number =  await getTableCount(tableName) || 0;
        let tableData: any = await getPaginatedData(tableName,orderColumn,0,999);
  
        while(tableSize > tableData.length){
          await getPaginatedData(tableName,orderColumn, tableData.length, tableData.length + 1000)
          .then((data: any)=> {tableData.push(...data)})
        }
        return tableData
      }

      async function getSingleRecord(tableName: string, id: {column: any, value: any}) {
        const { data, error } = await supabase
          .from(tableName)
          .select()
          .eq(id.column, id.value)
          .maybeSingle()
          
          if(error) {
            console.log(error)
          }
          if(data){
            return data
      }
      }
  
      async function getPaginatedData(tableName: string, orderColumn: string, from: number, to: number) {
        const { data, count, error } = await supabase
          .from(tableName)
          .select("*", { count: "exact" })
          .order(orderColumn, { ascending: true })
          .range(from, to)
  
          if(error) {
            console.log(error)
          }
          if(data){
            return data
      }
    }
  
      async function getTableCount(tableName: string) {
        const { data, count, error } = await supabase
          .from(tableName)
          .select("*", { count: "exact", head: true })
          if(error) {
            console.log(error)
          }
          if(count){
            return count
          }
      }

      async function updateRecord(tableName: string, record: {[column: string]: [value: any]}, id: {column: any, value: any}) {
        const { data,error } = await supabase
          .from(tableName)
          .update(record)
          .eq(id.column, id.value)
          .select()
          if(error){
            console.log(error)
          }
          if(data){
            return data
          }
      }

      async function deleteRecord(tableName: string, id: {column: any, value: any}){
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq(id.column, id.value)
          if(error){
            console.log(error)
          }
      }

      return {
        getTable,
        getSingleRecord,
        getPaginatedData,
        getTableCount,
        updateRecord,
        deleteRecord
    }
}