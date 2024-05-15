import android.R
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.myapp.Food


class MyDataAdapter(myDataModelList: List<Food>) :
    RecyclerView.Adapter<MyDataAdapter.MyViewHolder>() {
    private val myDataModelList: List<Food>

    init {
        this.myDataModelList = myDataModelList
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view: View =
            LayoutInflater.from(parent.context).inflate(R.layout.item_layout, parent, false)
        return MyViewHolder(view)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val myDataModel: MyDataModel = myDataModelList[position]
        holder.titleTextView.setText(myDataModel.getTitle())
        holder.descriptionTextView.setText(myDataModel.getDescription())
    }

    override fun getItemCount(): Int {
        return myDataModelList.size
    }

    inner class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val titleTextView: TextView
        private val descriptionTextView: TextView

        init {
            titleTextView = itemView.findViewById(R.id.title_text_view)
            descriptionTextView = itemView.findViewById(R.id.description_text_view)
        }
    }
}